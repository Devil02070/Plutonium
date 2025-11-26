'use client'
import { useMemo } from "react";
import { useAppKitNetworkCore, useAppKitProvider, type Provider } from "@reown/appkit/react";
import { ethers } from "ethers";

export default function useProvider() {
    const { walletProvider } = useAppKitProvider<Provider>("eip155");
    const { chainId } = useAppKitNetworkCore();

    const provider = useMemo(() => {
        if (!walletProvider || !chainId) return null;

        return new ethers.providers.Web3Provider(walletProvider, {
            name: "appkit",
            chainId: Number(chainId),
        });
    }, [walletProvider, chainId]);

    return { provider };
}


// 'use client'
// import { useAppKitNetworkCore, useAppKitProvider, type Provider } from "@reown/appkit/react";
// import { ethers } from "ethers";

// export default function useProvider() {
//     const { walletProvider } = useAppKitProvider<Provider>("eip155");
//     const { chainId } = useAppKitNetworkCore();
//     const provider = new ethers.providers.Web3Provider(walletProvider, chainId);
//     return {
//         provider
//     }
// }