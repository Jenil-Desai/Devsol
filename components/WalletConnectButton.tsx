"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/retroui/Button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Dialog } from "@/components/retroui/Dialog";
import Image from "next/image";
import { Menu } from "./retroui/Menu";

//handle wallet balance fixed to 2 decimal numbers without rounding
export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

export default function WalletConnectButton() {
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();

  const [open, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info?.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [publicKey, connection]);

  useEffect(() => {
    setUserWalletAddress(publicKey?.toBase58()!);
  }, [publicKey]);

  const handleWalletSelect = async (walletName: any) => {
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
          {!publicKey ? (
            <>
              <Dialog.Trigger asChild>
                <Button>
                  {connecting ? "connecting..." : "Connect Wallet"}
                </Button>
              </Dialog.Trigger>
            </>
          ) : (
            <Button onClick={handleDisconnect}>
              Disconnect
            </Button>
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
