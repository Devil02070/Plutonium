'use client'
import { useAppKitAccount, useAppKitNetworkCore, useAppKitProvider, type Provider } from "@reown/appkit/react";
import { BrowserProvider, formatEther } from "ethers";
import { useEffect, useState } from "react";

export default function useBalance() {
    const [balance, setBalance] = useState(0)
    const { address } = useAppKitAccount()
    const { walletProvider } = useAppKitProvider<Provider>("eip155");
    const { chainId } = useAppKitNetworkCore();
    const handleGetBalance = async () => {
        if (!address) return
        const provider = new BrowserProvider(walletProvider, chainId);
        const balance = await provider.getBalance(address);
        const eth = formatEther(balance);
        console.log(`${eth} ETH`);
        setBalance(Number(eth))
    };
    useEffect(() => {
        handleGetBalance()
    }, [address])

    return { balance }
}