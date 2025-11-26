'use client'
import BorderEdges from "@/components/BorderEdges"
import { P12, P16 } from "@/components/typography"
import useContract from "@/hooks/useContract"
import { formatTinyEth } from "@/lib/utils"
import { useAppKitAccount } from "@reown/appkit/react"
import { ethers } from "ethers"
import Image from "next/image"
import { useEffect, useState } from "react"

interface RoundStatsProps {
    timer: number
}

export default function RoundStats({ timer }: RoundStatsProps) {
    const { address } = useAppKitAccount()
    const { readContract } = useContract();
    const [totalDeposit, setTotalDeposit] = useState(0)
    const [userDeposit, setUserDeposit] = useState(0)
    const [powerhouse, setPowerhouse] = useState(0)

    const getPowerhouseBalance = async () => {
        try {
            const amount = await readContract.powerHouseTokenBalance();
            const formatted = amount
                ? ethers.utils.formatEther(amount)
                : "0";
            setPowerhouse(Number(formatted))
        } catch (err) {
            console.log("view error", err);
        }
    }

    const getTotalUserDeposit = async () => {
        if (!address) return;
        try {
            const amount = await readContract.totalUserStake(address);
            // console.log('userDeposit', amount)
            const formatted = amount
                ? ethers.utils.formatEther(amount)
                : "0";
            setUserDeposit(Number(formatted))
        } catch (err) {
            console.log("view error", err);
        }
    }

    const getTotalRoundDeposit = async () => {
        try {
            const amount = await readContract.allOverStakeAmount();
            // console.log('OverALL Round Deposit', amount)
            const formatted = amount
                ? ethers.utils.formatEther(amount)
                : "0";
            setTotalDeposit(Number(formatted))
        } catch (err) {
            console.log("overall error", err);
        }
    }

    useEffect(() => {
        const fetchAll = () => {
            getPowerhouseBalance();
            getTotalRoundDeposit();
            if (address) getTotalUserDeposit();
        };

        fetchAll();
        const interval = setInterval(fetchAll, 10000);

        return () => clearInterval(interval);
    }, [address]);

    return (
        <div className="grid grid-cols-4 gap-1.5 2xl:gap-13 text-center w-full border-[1.5px] border-gray-40 p-1 xlp-2">
            <BorderEdges cornerColor="#6E54FF" cornerThickness={2}>
                <div className="p-1 space-y-2.5 text-center">
                    <P12 className="text-gray-70 font-medium">Powerhouse</P12>
                    <div className="flex items-center gap-1 md:gap-2 justify-center">
                        <Image src="/media/logo-icon.svg" alt="logo" height={20} width={20} className="rounded-full" />
                        <P16 className="font-bold">{powerhouse}</P16>
                    </div>
                </div>
            </BorderEdges>
            <div className="p-1 space-y-2.5 text-center">
                <P12 className="text-gray-70 font-medium">Time Remaining</P12>
                {/* <P16 className="font-bold text-base-red">{timer}</P16> */}
                {
                    timer <= 0 ?
                        <P16 className="font-bold text-base-red">waiting...</P16>
                        :
                        <P16 className="font-bold text-base-red">00:{timer}</P16>
                }
            </div>
            <div className="p-1 space-y-2.5 text-center">
                <P12 className="text-gray-70 font-medium">Total Deposit</P12>
                <div className="flex items-center gap-1 md:gap-2 justify-center">
                    <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">{formatTinyEth(totalDeposit)}</P16>
                </div>
            </div>
            <div className="p-1 space-y-2.5 text-center">
                <P12 className="text-gray-70 font-medium">Your Deposit</P12>
                <div className="flex items-center gap-1 md:gap-2 justify-center">
                    <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">{formatTinyEth(Number(userDeposit))}</P16>
                </div>
            </div>
        </div>
    )
}