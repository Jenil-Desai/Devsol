import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
          <div className="max-w-3xl space-y-6 text-center">
            <Badge variant={"solid"}>
              Solana Devnet
            </Badge>
            <Text as={"h1"} className="font-extrabold tracking-tight sm:text-5xl md:text-6xl mt-3">
              Get Devnet SOL Instantly
            </Text>
            <p className="text-xl text-[#8b949e]">A faucet for Solana developers</p>
            <div className="pt-4 flex justify-center items-center">
              <Link href="/request">
                <Button size="lg">
                  Request SOL
                </Button>
              </Link>
            </div>
            <Card>
              <Card.Header>
                <Card.Title>What is Devnet SOL?</Card.Title>
              </Card.Header>
              <Card.Content>
                <Text>
                  Devnet SOL is used for testing Solana applications without using real tokens. Developers use it to build
                  and test their dApps in a sandbox environment.
                </Text>
              </Card.Content>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
