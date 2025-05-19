"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface WalletContextType {
  connected: boolean
  address: string | null
  balance: number
  connect: () => void
  disconnect: () => void
  requestAirdrop: (amount: number) => Promise<string>
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: null,
  balance: 0,
  connect: () => { },
  disconnect: () => { },
  requestAirdrop: async () => "",
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      setConnected(true)
      setAddress(savedAddress)
      setBalance(Math.random() * 5) // Simulate balance
    }
  }, [])

  const connect = () => {
    // Simulate wallet connection
    const mockAddress = "CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq"
    setConnected(true)
    setAddress(mockAddress)
    setBalance(Math.random() * 5) // Random initial balance
    localStorage.setItem("walletAddress", mockAddress)
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
    setBalance(0)
    localStorage.removeItem("walletAddress")
  }

  const requestAirdrop = async (amount: number): Promise<string> => {
    // Simulate airdrop request with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        setBalance((prev) => prev + amount)
        // Generate a mock transaction hash
        const hash = "5Urz" + Math.random().toString(36).substring(2, 10) + "Gq3XwzVQxRVkEMQiR4"
        resolve(hash)
      }, 2000)
    })
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        address,
        balance,
        connect,
        disconnect,
        requestAirdrop,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
