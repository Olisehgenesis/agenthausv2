"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GoodAgentGameArenaEmbed } from "@/components/goodagent/GoodAgentGameArenaEmbed";

export default function GameArenaAgentPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      <Link
        href="/dashboard/agents/create"
        className="inline-flex items-center gap-2 text-sm font-medium text-forest-muted hover:text-forest"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to create options
      </Link>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-forest-muted">
          GoodAgent
        </p>
        <h1 className="mt-1 text-2xl font-bold text-forest md:text-3xl">
          Deploy a Game Arena player
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-forest-muted">
          Deploy, vouch, and run your GoodAgent bot without leaving Agent Haus.
          Your wallet owns the agent; MARKOV matches on Game Arena run on
          GoodAgent servers.
        </p>
      </div>

      <GoodAgentGameArenaEmbed />
    </div>
  );
}
