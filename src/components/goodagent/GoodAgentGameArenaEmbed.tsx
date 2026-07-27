"use client";

import React, { useMemo } from "react";
import { modal } from "@reown/appkit/react";
import {
  useAccount,
  useSignMessage,
  useSignTypedData,
  useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import {
  GoodAgentWidget,
  createGameArenaWidgetConfig,
  createWalletAdapterFromHooks,
} from "@goodagent/widget";
import "@goodagent/widget/styles.css";
import "@/styles/goodagent-widget-agenthaus.css";
import { config as wagmiConfig } from "@/config/appkit";

const PARTNER_ID = "agenthaus";

export function GoodAgentGameArenaEmbed() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { signTypedDataAsync } = useSignTypedData();
  const { writeContractAsync } = useWriteContract();

  const wallet = useMemo(
    () =>
      createWalletAdapterFromHooks({
        address,
        isConnected,
        connect: async () => {
          modal?.open({ view: "Connect" });
        },
        signMessageAsync,
        signTypedDataAsync,
        writeContractAsync,
        waitForTransactionReceipt: ({ hash }) =>
          waitForTransactionReceipt(wagmiConfig, { hash }),
      }),
    [
      address,
      isConnected,
      signMessageAsync,
      signTypedDataAsync,
      writeContractAsync,
    ],
  );

  const widgetConfig = useMemo(
    () =>
      createGameArenaWidgetConfig({
        partnerId: PARTNER_ID,
        skillLabel: "GoodAgent",
        defaultDisplayName: "My GoodAgent Player",
        deployHint:
          "Deploy a GoodAgent player for Game Arena MARKOV matches. Your wallet owns it — we host and run the bot.",
        fvCallbackUrl:
          typeof window !== "undefined"
            ? `${window.location.origin}/dashboard/agents/gamearena`
            : undefined,
      }),
    [],
  );

  return (
    <div className="goodagent-embed neobrutal-shadow rounded-none border-2 border-forest bg-white p-5 md:p-8">
      <GoodAgentWidget mode="full" wallet={wallet} config={widgetConfig} />
    </div>
  );
}
