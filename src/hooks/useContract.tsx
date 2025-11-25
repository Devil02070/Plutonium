'use client'
import { ethers } from "ethers";
import ABI from "@/abi/read.json";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";
import { ContractAddress, PublicRPC } from "@/utils/env";

export default function useContract() {

    // 1. PUBLIC PROVIDER FOR READS
    const readProvider = new ethers.providers.JsonRpcProvider(PublicRPC);
    const readContract = new ethers.Contract(ContractAddress, ABI, readProvider);

    // 2. WALLET PROVIDER FOR WRITES
    const { walletProvider } = useAppKitProvider<Provider>("eip155");

    const getWriteContract = async () => {
        if (!walletProvider) return null;

        const browserProvider = new ethers.providers.Web3Provider(walletProvider);
        const signer = browserProvider.getSigner();

        return new ethers.Contract(ContractAddress, ABI, signer);
    };

    // return { readContract, writeContract };
    return { readContract, getWriteContract };
}


// 'use client'
// import { ethers } from "ethers";
// import ABI from "@/abi/read.json";
// import { useAppKitProvider, type Provider } from "@reown/appkit/react";

// export default function useContract() {
//     const { walletProvider } = useAppKitProvider<Provider>("eip155");
//     const CONTRACT_ADDRESS = "0x499f0Eeaf9e992Cd88f482D9e889f811dF3d3336";

//     if (!walletProvider) return;
//     const provider = new ethers.BrowserProvider(walletProvider);

//     const contract = new ethers.Contract(
//         CONTRACT_ADDRESS,
//         ABI,
//         provider
//     )
//     return  contract ;
// }