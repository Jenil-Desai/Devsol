import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devsol",
  description: "Get free Solana tokens for testing on devnet by connecting your wallet to this simple faucet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
