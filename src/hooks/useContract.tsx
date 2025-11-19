'use client'
import { ethers } from "ethers";
import ABI from "@/abi/read.json";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";

export default function useContract() {
    const CONTRACT_ADDRESS = "0xbE44B7923a03c0ef92F97753De70cdFcB219D7d9";
    // const PUBLIC_RPC = 'https://bsc-testnet-rpc.publicnode.com'
    const PUBLIC_RPC = 'https://sepolia.infura.io/v3/bab8e5589eb8429898ea91cc554d641f'

    // 1. PUBLIC PROVIDER FOR READS
    const readProvider = new ethers.JsonRpcProvider(PUBLIC_RPC);
    const readContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, readProvider);

    // 2. WALLET PROVIDER FOR WRITES
    const { walletProvider } = useAppKitProvider<Provider>("eip155");
    // let writeContract = null;

    // if (walletProvider) {
    //     const browserProvider = new ethers.BrowserProvider(walletProvider);
    //     writeContract = new ethers.Contract(
    //         CONTRACT_ADDRESS,
    //         ABI,
    //         browserProvider
    //     );
    // }
    const getWriteContract = async () => {
        if (!walletProvider) return null;

        const browserProvider = new ethers.BrowserProvider(walletProvider);
        const signer = await browserProvider.getSigner();

        return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
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