'use client'
import { useAppKit, useAppKitAccount, useAppKitNetworkCore, useAppKitProvider, type Provider } from "@reown/appkit/react";
import { Button } from "../ui/button";
import BorderEdges from "../BorderEdges";
import { MdOutlineWallet } from "react-icons/md";

import { BrowserProvider, JsonRpcSigner } from "ethers";
import { BackendUrl } from "@/utils/env";
import { shortenAddress } from "@/lib/utils";

export default function WalletButton() {
    const { open } = useAppKit();

    const { address, isConnected } = useAppKitAccount();
    // Get the current chain ID
    const { chainId } = useAppKitNetworkCore();
    // Get the wallet provider (IMPORTANT: pass "eip155" for EVM chains)
    const { walletProvider } = useAppKitProvider<Provider>("eip155");

    const handleSignMsg = async () => {
        if (!address) {
            console.log('no address')
            return;
        }
        try {
            // Create the provider and signer
            const provider = new BrowserProvider(walletProvider, chainId);
            const signer = new JsonRpcSigner(provider, address);

            const res = await fetch(`${BackendUrl}/api/v1/auth/nonce`);
            const data = await res.json();
            console.log('api-message', data.data);
            const { nonce } = data.data

            const message = `Hello Reown AppKit! ${nonce}`

            // Sign the message
            const signature = await signer.signMessage(`${message}`);

            // Log or use the signature
            console.log("Signature:", signature, message, address);

            const output = await fetch(`${BackendUrl}/api/v1/auth/sign-in`, {
                method: 'POST',
                credentials: "include",
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    message,
                    address,
                    signature,
                })
            });

            const result = await output.json();
            console.log('Sign-in result:', result);

            //         if (result.data) {
            //     Cookies.set('authToken', JSON.stringify(result.data), {
            //       expires: 7,
            //       secure: CookieToken === 'production',
            //       sameSite: 'strict'
            //     });
            //   }

            return result;

            // return signature;
        } catch (error) {
            console.error("Error signing message:", error);
        }
    };
    return (
        <>
            {
                isConnected && address ?
                    <BorderEdges padding={3} cornerColor="#1297F5" cornerThickness={1}>
                        <Button onClick={() => open()} className="cursor-pointer">{shortenAddress(address)}
                        </Button>
                    </BorderEdges>
                    :
                    <BorderEdges padding={3} cornerColor="#1297F5" cornerThickness={1}>
                        <Button onClick={() => open()} className="cursor-pointer">Connect <MdOutlineWallet size={16} />
                        </Button>
                    </BorderEdges>
            }
            {isConnected &&
                <Button onClick={handleSignMsg} variant="outline" className="border-primary">Sign</Button>
            }
        </>
        //     <button onClick={() => open({ view: "Networks" })}>
        //     Open Network Modal
        //   </button>
    )
}