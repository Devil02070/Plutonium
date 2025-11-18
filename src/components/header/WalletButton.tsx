'use client'
import { useAppKit, useAppKitAccount, } from "@reown/appkit/react";
import { Button } from "../ui/button";
import BorderEdges from "../BorderEdges";
import { MdOutlineWallet } from "react-icons/md";
import { shortenAddress } from "@/lib/utils";
import { useEffect, } from "react";
import { useWalletAuth } from "@/hooks/useWalletAuth";

export default function WalletButton() {
    const { open } = useAppKit();
    const { handleSignMsg } = useWalletAuth()
    const { address, isConnected, } = useAppKitAccount();

    useEffect(() => {
        if (isConnected && address) {
            handleSignMsg();
        }

        // Clear cookie when wallet disconnects
        // if (!isConnected) {
        //     // hasSignedRef.current = false;
        //     Cookies.remove('authToken');
        //     console.log('Wallet disconnected, auth token cleared');
        // }
    }, [isConnected, address])
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
        </>
    )
}