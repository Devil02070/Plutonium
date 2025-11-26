'use client'
import { useAppKitAccount } from "@reown/appkit/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useProvider from "./useProvider";

export default function useBalance() {
    const [balance, setBalance] = useState(0)
    const { address } = useAppKitAccount()
    const { provider } = useProvider();
    const handleGetBalance = async () => {
        if (!address || !provider) return
        const balance = await provider.getBalance(address);
        const eth = ethers.utils.formatEther(balance);
        console.log(`${eth} ETH`);
        setBalance(Number(eth))
    };
    useEffect(() => {
        handleGetBalance()
    }, [address])

    return { balance }
}

// 'use client'
// import { useAppKitAccount, useAppKitNetworkCore, useAppKitProvider, type Provider } from "@reown/appkit/react";
// import { ethers } from "ethers";
// import { useEffect, useState } from "react";
// import useProvider from "./useProvider";

// export default function useBalance() {
//     const [balance, setBalance] = useState(0)
//     const { address } = useAppKitAccount()
//     // const { walletProvider } = useAppKitProvider<Provider>("eip155");
//     // const { chainId } = useAppKitNetworkCore();
//     const { provider } = useProvider();
//     const handleGetBalance = async () => {
//         if (!address || !provider) return
//         // const provider = new ethers.providers.Web3Provider(walletProvider, chainId);
//         const balance = await provider.getBalance(address);
//         const eth = ethers.utils.formatEther(balance);
//         console.log(`${eth} ETH`);
//         setBalance(Number(eth))
//     };
//     useEffect(() => {
//         handleGetBalance()
//     }, [address])

//     return { balance }
// }