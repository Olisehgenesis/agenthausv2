
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { processMessage } from "@/lib/openclaw/manager";

export const maxDuration = 60; // Allow up to 60s for processing tasks

/**
 * Unified Heartbeat Webhook
 * 
 * Frequency: Every second (from external backend)
 * Secret: ugandaisfake
 */
export async function POST(req: Request) {
    try {
        // 1. Authenticate
        const secret = req.headers.get("x-webhook-secret");
        if (secret !== process.env.WEBHOOK_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json().catch(() => ({}));
        const tokenRaw = typeof body.token === "string" ? body.token.trim() : "";
        const priceRaw = Number(body.price);
        const token = tokenRaw ? tokenRaw.toUpperCase() : "";
        const currentPrice = Number.isFinite(priceRaw) ? priceRaw : null;
        const now = new Date();

        console.log(`[Heartbeat] ${now.toISOString()} - Token: ${tokenRaw} -> ${token}, Price: ${body.price} -> ${currentPrice}`);

        // 2. Find and process PRICE tasks
        if (token && currentPrice !== null) {
            const priceTasks = await prisma.agentTask.findMany({
                where: {
                    triggerType: "price",
                    tokenSymbol: token,
                    status: "active",
                },
                include: { agent: true },
            });

            for (const task of priceTasks) {
                try {
                    if (evaluatePriceCondition(task, currentPrice)) {
                        await executeTaskAction(task);
                        await prisma.agentTask.update({
                            where: { id: task.id },
                            data: { status: "completed" },
                        });
                    }
                } catch (error) {
                    console.error(`[Price Task Error] task ${task.id} error:`, error);
                    await prisma.activityLog.create({
                        data: {
                            agentId: task.agentId,
                            type: "error",
                            message: `Price task ${task.id} failed: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    });
                    await prisma.agentTask.update({
                        where: { id: task.id },
                        data: { status: "failed" },
                    });
                }
            }
        }

        // 3. Find and process TIME/CRON tasks
        // One-time tasks
        const timeTasks = await prisma.agentTask.findMany({
            where: {
                triggerType: "time",
                executeAt: { lte: now },
                status: "active",
            },
            include: { agent: true },
        });

        for (const task of timeTasks) {
            try {
                await executeTaskAction(task);
                await prisma.agentTask.update({
                    where: { id: task.id },
                    data: { status: "completed" },
                });
            } catch (error) {
                console.error(`[Time Task Error] task ${task.id} error:`, error);
                await prisma.activityLog.create({
                    data: {
                        agentId: task.agentId,
                        type: "error",
                        message: `Time task ${task.id} failed: ${error instanceof Error ? error.message : String(error)}`,
                    },
                });
                await prisma.agentTask.update({
                    where: { id: task.id },
                    data: { status: "failed" },
                });
            }
        }

        // Recurring tasks (CRON)
        const cronTasks = await prisma.agentTask.findMany({
            where: {
                triggerType: "cron",
                status: "active",
            },
            include: { agent: true },
        });

        for (const task of cronTasks) {
            if (!shouldRunCronNow(task.cronSchedule, task.lastExecutedAt, now)) continue;

            try {
                await executeTaskAction(task);
                await prisma.agentTask.update({
                    where: { id: task.id },
                    data: { lastExecutedAt: now },
                });
            } catch (error) {
                console.error(`[Cron Task Error] task ${task.id} error:`, error);
                await prisma.activityLog.create({
                    data: {
                        agentId: task.agentId,
                        type: "error",
                        message: `Cron task ${task.id} failed: ${error instanceof Error ? error.message : String(error)}`,
                    },
                });
                await prisma.agentTask.update({
                    where: { id: task.id },
                    data: { status: "failed" },
                });
            }
        }

        return NextResponse.json({
            ok: true,
            timestamp: now.toISOString(),
            processed: true,
        });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal error" },
            { status: 500 }
        );
    }
}

/**
 * Evaluate if a price condition is met.
 */
function evaluatePriceCondition(task: any, currentPrice: number): boolean {
    const { conditionType, targetValue, baselinePrice } = task;

    if (!Number.isFinite(currentPrice)) return false;
    const target = Number(targetValue);
    const baseline = Number(baselinePrice);

    if (conditionType === "price_above" && Number.isFinite(target) && currentPrice >= target) return true;
    if (conditionType === "price_below" && Number.isFinite(target) && currentPrice <= target) return true;

    if (conditionType === "percentage_increase" && Number.isFinite(target) && Number.isFinite(baseline) && baseline !== 0) {
        const increase = ((currentPrice - baseline) / baseline) * 100;
        if (increase >= target) return true;
    }

    if (conditionType === "percentage_decrease" && Number.isFinite(target) && Number.isFinite(baseline) && baseline !== 0) {
        const decrease = ((baseline - currentPrice) / baseline) * 100;
        if (decrease >= target) return true;
    }

    return false;
}

/**
 * Execute the action associated with a task.
 * For now, we use processMessage with a forced prompt to leverage existing skill logic.
 */
async function executeTaskAction(task: any) {
    const { agentId, actionType, actionPayload } = task;

    // We log activity
    await prisma.activityLog.create({
        data: {
            agentId,
            type: "action",
            message: `Running Task ${task.id}: ${actionType}`,
            metadata: JSON.stringify({ actionType, actionPayload }),
        },
    });

    try {
        // If it's a blockchain action, we typically expect a command tag or a skill prompt.
        // To leverage existing safety/execution logic, we send it to processMessage.
        const prompt = `[AUTOMATED TASK: ${actionType}] ${actionPayload}`;

        await processMessage(agentId, prompt, []); // No history for automated tasks

        console.log(`[Task Execution] Successfully ran task ${task.id} for agent ${agentId}`);
    } catch (error) {
        console.error(`[Task Execution Error] Task ${task.id} failed:`, error);
        await prisma.activityLog.create({
            data: {
                agentId,
                type: "error",
                message: `Task ${task.id} failed: ${error instanceof Error ? error.message : String(error)}`,
            },
        });
        // Mark as failed if it's not a recurring task? 
        // For now, the caller handles status update.
    }
}

/**
 * Very basic cron check helper. 
 * Reuses logic style from scheduler.ts if possible, or simple check.
 */
function shouldRunCronNow(schedule: string | null, lastRun: Date | null, now: Date): boolean {
    if (!schedule) return false;

    // Prevent double execution in the same minute
    if (lastRun) {
        const diffMs = now.getTime() - lastRun.getTime();
        if (diffMs < 55000) return false;
    }

    // Use a simple check or library. Since we already have cronMatches in scheduler,
    // in a real app we'd export it. For this one-off file, I'll implement a basic one
    // or just import it if I can make it clean.
    // Actually, I'll just check if the minute has changed if it's a "every minute" or similar.
    // For now, let's assume standard cron format and use a simple parser style.

    // To be safe and robust, let's just use the hour/min check for now or implement a mini-parser.
    // I'll implementation a simple one that handles basic cron patterns.
    return cronMatches(schedule, now);
}

// Simple cron parser (copied/adapted from scheduler.ts style)
function cronMatches(cronExpr: string, date: Date): boolean {
    const parts = cronExpr.trim().split(/\s+/);
    if (parts.length !== 5) return false;

    const [minField, hourField, domField, monField, dowField] = parts;
    const minute = date.getMinutes();
    const hour = date.getHours();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    return (
        fieldMatches(minField, minute, 0, 59) &&
        fieldMatches(hourField, hour, 0, 23) &&
        fieldMatches(domField, dayOfMonth, 1, 31) &&
        fieldMatches(monField, month, 1, 12) &&
        fieldMatches(dowField, dayOfWeek, 0, 7)
    );
}

function fieldMatches(field: string, value: number, min: number, max: number): boolean {
    if (field === "*") return true;
    const parts = field.split(",");
    for (const part of parts) {
        if (singleFieldMatches(part.trim(), value, min, max)) return true;
    }
    return false;
}

function singleFieldMatches(part: string, value: number, min: number, max: number): boolean {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    if (stepMatch) {
        const step = parseInt(stepMatch[2]);
        const base = stepMatch[1];
        if (base === "*") return value % step === 0;
        const rangeMatch = base.match(/^(\d+)-(\d+)$/);
        if (rangeMatch) {
            const start = parseInt(rangeMatch[1]);
            const end = parseInt(rangeMatch[2]);
            return value >= start && value <= end && (value - start) % step === 0;
        }
        return false;
    }
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
        const start = parseInt(rangeMatch[1]);
        const end = parseInt(rangeMatch[2]);
        return value >= start && value <= end;
    }
    const num = parseInt(part);
    return !isNaN(num) && value === num;
}
