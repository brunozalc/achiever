"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({ 
    connector: new InjectedConnector()
  });

  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/games");
    }
  }, [router, isConnected]);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#23252A]">
        <h1 className="text-6xl font-bold text-gradient">achiever</h1>
        <p className="text-secondary">showcase your gaming skills</p>
        <div className="flex flex-row space-x-4 mt-5">
          <ConnectButton
            label="sign in"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>
      </main>
    </>
  );
}
