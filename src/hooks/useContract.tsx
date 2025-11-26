'use client'
import { ethers } from "ethers";
import ABI from "@/abi/read.json";
import { ContractAddress, PublicRPC } from "@/utils/env";
import useProvider from "./useProvider";

export default function useContract() {
    const { provider } = useProvider();
    // 1. PUBLIC PROVIDER FOR READS
    const readProvider = new ethers.providers.JsonRpcProvider(PublicRPC);
    const readContract = new ethers.Contract(ContractAddress, ABI, readProvider);

    const getWriteContract = async () => {
        if (!provider) return null;
        const signer = provider.getSigner();

        return new ethers.Contract(ContractAddress, ABI, signer);
    };
    return { readContract, getWriteContract };
}

// 'use client'
// import { ethers } from "ethers";
// import ABI from "@/abi/read.json";
// import { useAppKitProvider, type Provider } from "@reown/appkit/react";
// import { ContractAddress, PublicRPC } from "@/utils/env";
// import useProvider from "./useProvider";

// export default function useContract() {
//     const { provider } = useProvider();
//     // 1. PUBLIC PROVIDER FOR READS
//     const readProvider = new ethers.providers.JsonRpcProvider(PublicRPC);
//     const readContract = new ethers.Contract(ContractAddress, ABI, readProvider);

//     // 2. WALLET PROVIDER FOR WRITES
//     const { walletProvider } = useAppKitProvider<Provider>("eip155");

//     const getWriteContract = async () => {
//         if (!provider) return null;

//         // const browserProvider = new ethers.providers.Web3Provider(walletProvider);
//         const signer = provider.getSigner();

//         return new ethers.Contract(ContractAddress, ABI, signer);
//     };

//     // return { readContract, writeContract };
//     return { readContract, getWriteContract };
// }