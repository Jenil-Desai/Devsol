"use client"
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { useWallet } from "@/hooks/use-wallet";
import { Link, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [amount, setAmount] = useState("0.5")
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState("")
  const { connected, address, balance, requestAirdrop } = useWallet()

  const handleRequest = async () => {
    if (!connected || !amount) return

    setIsLoading(true)
    try {
      const hash = await requestAirdrop(Number.parseFloat(amount))
      setTxHash(hash)
    } catch (error) {
      console.error("Airdrop failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto max-w-2xl px-4 py-12">
          <Link href="/" className="mb-6 inline-flex items-center text-sm text-[#8b949e] hover:text-[#f0f6fc]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="w-full">
            <Card.Header>
              <Card.Title>Request Devnet SOL</Card.Title>
            </Card.Header>

            <Card.Content>
              {connected ? (
                <div className="p-4 text-center">
                  <p className="mb-4">Connect your wallet to request SOL</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Text as={"p"} className="text-sm text-[#8b949e]">Wallet Address</Text>
                      <Text as={"p"} className="font-mono text-sm">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </Text>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text as={"p"} className="text-sm text-[#8b949e]">Devnet SOL Balance</Text>
                      <Text as={"p"} className="font-mono text-sm">{balance} SOL</Text>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="amount" className="block text-sm font-medium text-[#8b949e]">
                      Amount of SOL to request
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0.1"
                      max="2"
                      step="0.1"
                    />
                    <p className="text-xs text-[#8b949e]">Maximum 2 SOL per request</p>
                  </div>

                  <Button
                    onClick={handleRequest}
                    disabled={isLoading || !amount}
                  >
                    {isLoading ? "Processing..." : "Request SOL"}
                  </Button>

                  {txHash && (
                    <div className="mt-4 rounded-md bg-[#7ee787]/10 p-4">
                      <p className="mb-2 text-sm font-medium text-[#7ee787]">Transaction Successful!</p>
                      <p className="break-all text-xs text-[#8b949e]">Transaction Hash: {txHash}</p>
                    </div>
                  )}
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </main>

    </div>
  )
}
