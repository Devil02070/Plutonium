'use client'
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { BackendUrl, CookieToken } from "@/utils/env";
import Cookies from 'js-cookie';
import { useAppKitAccount, useAppKitNetworkCore, useAppKitProvider, type Provider } from "@reown/appkit/react";
import backendApi from "@/utils/backendApi";

export const useWalletAuth = () => {
    const { address } = useAppKitAccount();
    const { chainId } = useAppKitNetworkCore();
    const { walletProvider } = useAppKitProvider<Provider>("eip155");
    const handleSignMsg = async () => {
        if (!address) {
            console.log('Wallet not connected');
            return { success: false, error: 'Wallet not connected' };
        }

        const existingToken = Cookies.get('authToken');
        if (existingToken) {
            console.log('Already authenticated');
            return { success: true, message: 'Already authenticated' };
        }

        try {
            // Create the provider and signer
            const provider = new BrowserProvider(walletProvider, chainId);
            const signer = new JsonRpcSigner(provider, address);

            // Get nonce from backend
            // const res = await fetch(`${BackendUrl}/api/v1/auth/nonce`);
            // const data = await res.json();
            // const { nonce } = data.data;
            const res = await backendApi.getNonce()
            // console.log('nonce',)
            const { nonce } = res.data.data;
            const message = `Welcome to Plutonium ${nonce}`;

            // Sign the message
            const signature = await signer.signMessage(message);
            console.log("Signature:", signature, message, address);

            // Send signature to backend
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

            // Store auth token in cookie
            if (result.data) {
                Cookies.set('authToken', JSON.stringify(result.data), {
                    expires: 7,
                    secure: CookieToken === 'production',
                    sameSite: 'strict'
                });
            }

            return { success: true, data: result };
        } catch (error) {
            console.error("Error signing message:", error);
            return { success: false, error };
        }
    };

    const clearAuthToken = () => {
        Cookies.remove('authToken');
        console.log('Auth token cleared');
    };

    return {
        handleSignMsg,
        clearAuthToken,
    };
};