"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bot, Gamepad2 } from "lucide-react";

export default function CreateAgentChooserPage() {
  const router = useRouter();

  const goGameArena = () => {
    router.push("/dashboard/agents/gamearena");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <Link
        href="/dashboard/agents"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-forest-muted hover:text-forest"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Agents
      </Link>

      <div className="mb-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-forest-muted">
          Create agent
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-forest md:text-4xl">
          Choose how to deploy
        </h1>
        <p className="mt-3 max-w-xl text-sm text-forest-muted">
          Agent Haus ERC-8004 agents live on your dashboard here. GoodAgent
          players for Game Arena deploy in the embed below — hosted bot, vouch,
          and ladder in one flow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <button
          type="button"
          onClick={() => router.push("/dashboard/agents/new")}
          className="group neobrutal-shadow flex flex-col rounded-2xl border-2 border-forest bg-gypsum p-6 text-left transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#141414]"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-forest bg-celo">
            <Bot className="h-6 w-6 text-forest" />
          </div>
          <h2 className="text-lg font-bold text-forest">Agent Haus</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-muted">
            ERC-8004 identity on Celo, built-in wallet, chat, trading, Self.xyz
            verification — the standard create flow on this platform.
          </p>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest group-hover:underline">
            Continue here
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </span>
        </button>

        <button
          type="button"
          onClick={goGameArena}
          className="group neobrutal-shadow flex flex-col rounded-2xl border-2 border-forest bg-white p-6 text-left transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#141414]"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-forest bg-[#4E44CE]">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-forest">GoodAgent</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-forest-muted">
            Game Arena MARKOV player
          </p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-muted">
            Deploy a 24/7 GoodAgent bot for Game Arena — free tickets, human
            vouch, and live dashboard without leaving Agent Haus.
          </p>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest group-hover:underline">
            Continue with GoodAgent
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </span>
        </button>
      </div>

      <div className="mt-6 flex justify-center md:hidden">
        <Link
          href="/dashboard/agents/new"
          className="text-sm font-medium text-forest-muted underline"
        >
          Agent Haus only (skip chooser)
        </Link>
      </div>
    </div>
  );
}
