"use client"
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import WalletConnectButton from "@/components/WalletConnectButton";
import { RequestSolSchema, requestSolSchema } from "@/schema/reqSolSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const wallet = useWallet();
  const form = useForm({
    resolver: zodResolver(requestSolSchema),
    defaultValues: {
      amount: 0.1,
    },
  })

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      connection.getBalance(wallet.publicKey).then(balance => {
        setBalance(balance / LAMPORTS_PER_SOL);
      });
    }
  }, [wallet.connected, wallet.publicKey, connection]);

  useEffect(() => {
    if (!wallet.connected || !wallet.publicKey) return;
    const interval = setInterval(() => {
      if (!wallet.publicKey) return;
      connection.getBalance(wallet.publicKey).then(balance => {
        setBalance(balance / LAMPORTS_PER_SOL);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [wallet.connected, wallet.publicKey, connection]);

  async function requestSol(data: RequestSolSchema) {
    console.log(data);
    if (!wallet.connected || !wallet.publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }
    try {
      const tx = await connection.requestAirdrop(wallet.publicKey, data.amount * LAMPORTS_PER_SOL);
      toast.success("Successfull", {
        description: "Transaction Hash: " + tx,
        action: {
          label: "View on Solana Explorer",
          onClick: () => {
            window.open(`https://explorer.solana.com/tx/${tx}?cluster=devnet`, "_blank");
          },
        },
      });
    } catch (error) {
      toast.error("Error requesting SOL: " + error);
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto max-w-2xl px-4 py-12">
          <Card className="w-full">
            <Card.Header>
              <Card.Title>Airdrop SOL</Card.Title>
            </Card.Header>
            <Card.Content>
              {!wallet.connected || !wallet.publicKey ? (
                <div className="flex flex-col justify-center items-center">
                  <p className="mb-4">Connect your wallet to request SOL</p>
                  <WalletConnectButton />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Text as={"p"} className="text-sm text-[#8b949e]">Wallet Address</Text>
                      <Text as={"p"} className="font-mono text-sm">
                        {wallet.publicKey.toString().slice(0, 6)}...{wallet.publicKey.toString().slice(-4)}
                      </Text>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text as={"p"} className="text-sm text-[#8b949e]">Devnet SOL Balance</Text>
                      <Text as={"p"} className="font-mono text-sm">{balance} SOL</Text>
                    </div>
                  </div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(requestSol)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="amount"
                        disabled={form.formState.isSubmitting}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Label className="text-sm font-medium text-[#8b949e]">Amount of SOL to request</Label>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Amount"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-around items-center">
                        <WalletConnectButton />
                        <Button type="submit" variant={"secondary"} disabled={form.formState.isSubmitting}>Request SOL</Button>
                      </div>
                    </form>
                  </Form>
                  <div>
                  </div>
                </div>
              )}
            </Card.Content>
          </Card>
        </div >
      </main >
    </div >
  )
}
