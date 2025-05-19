import type { Metadata } from "next";
import "./globals.css";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import NavigationBar from "@/components/globals/NavigationBar";
import Footer from "@/components/globals/Footer";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

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
      <body className={`${archivoBlack.variable} ${space.variable}`}>
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
