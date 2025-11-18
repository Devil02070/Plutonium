'use client'
import { ethers } from "ethers";
import ABI from "@/abi/read.json";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";

export default function useContract() {
    const CONTRACT_ADDRESS = "0x499f0Eeaf9e992Cd88f482D9e889f811dF3d3336";
    const PUBLIC_RPC = 'https://bsc-testnet-rpc.publicnode.com'

    // 1. PUBLIC PROVIDER FOR READS
    const readProvider = new ethers.JsonRpcProvider(PUBLIC_RPC);
    const readContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, readProvider);

    // 2. WALLET PROVIDER FOR WRITES
    const { walletProvider } = useAppKitProvider<Provider>("eip155");
    let writeContract = null;

    if (walletProvider) {
        const browserProvider = new ethers.BrowserProvider(walletProvider);
        writeContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ABI,
            browserProvider
        );
    }

    return { readContract, writeContract };
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