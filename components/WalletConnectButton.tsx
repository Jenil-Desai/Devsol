"use client";
import React, { useState } from "react";
import { Button } from "@/components/retroui/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import { Dialog } from "@/components/retroui/Dialog";
import Image from "next/image";
import { WalletName } from "@solana/wallet-adapter-base";

export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

export default function WalletConnectButton() {
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();

  const [open, setOpen] = useState<boolean>(false);

  const handleWalletSelect = async (walletName: WalletName<string>) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  const handleDisconnect = async () => {
    disconnect();
  };


  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex gap-2 items-center">
          {publicKey ? (
            <Button onClick={handleDisconnect}>
              Disconnect
            </Button>
          ) : (
            <Dialog.Trigger asChild>
              <Button>
                {connecting ? "connecting..." : "Connect Wallet"}
              </Button>
            </Dialog.Trigger>
          )}

          <Dialog.Content>
            <div className="flex w-full justify-center items-center p-6">
              <div className="flex flex-col justify-start items-center space-y-5 w-[300px] md:w-[400px] overflow-y-auto">
                {wallets.map((wallet) => (
                  <Button
                    key={wallet.adapter.name}
                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                    variant={"secondary"}
                  >
                    <div className="flex">
                      <Image
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        height={30}
                        width={30}
                        className="mr-5"
                      />
                    </div>
                    <div className="font-slackey text-white wallet-name text-[20px]">
                      {wallet.adapter.name}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog>
    </div>
  );
};
