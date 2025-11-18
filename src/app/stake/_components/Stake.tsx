'use client'
import BorderEdges from "@/components/BorderEdges"
import { H1, P12, P14, P16 } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { handleKeyPress } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import { MdOutlineWallet } from "react-icons/md"

export default function Stake() {
    const [amount, setAmount] = useState('')
    const walletBalance = 100;
    const claimAmount = 20;

    const onStake = async () => {
        try {
            console.log('stake amount', amount)
        } catch (error) {
            console.log(error)
        }
    }

    const onClaim = async () => {
        try {
            console.log('claim amount', claimAmount)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="space-y-2 mt-6">
                <P12>Stake</P12>
                <BorderEdges padding={2} cornerColor="#1297F5" cornerThickness={1.5} className="w-full">
                    <div className="bg-gray-30 p-3.25">
                        <div className="flex items-center justify-between gap-2">
                            <div className="bg-primary-dark rounded flex items-center gap-1 justify-center p-1">
                                <Image src="/media/Vector.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                <P14 className="font-bold">log</P14>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <MdOutlineWallet size={14} />
                                <P14 className="font-semibold">{(walletBalance).toLocaleString()}</P14>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 justify-between mt-2.5">
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="0.00"
                                    className="text-[28px] font-bold focus:outline-none w-full"
                                    onKeyDown={handleKeyPress}
                                    inputMode="decimal"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <P16 className="font-medium text-gray-70">$0.00</P16>
                            </div>
                            <Button size="sm" className="rounded cursor-pointer" onClick={() => setAmount(walletBalance.toString())}>Max</Button>
                        </div>
                    </div>
                </BorderEdges>
                <div className="text-center mt-2">
                    <BorderEdges padding={3} cornerColor="#1297F5" cornerThickness={1.5} className="mx-auto w-fit">
                        <Button className="mx-auto w-fit" onClick={() => onStake()}>Stake</Button>
                    </BorderEdges>
                </div>
            </div>

            {/* claim */}
            <div className="space-y-2 mt-6">
                <P12>Yield available to claim</P12>
                <div className="p-3.25">
                    <div className="bg-gray-20 rounded flex items-center gap-1 justify-center p-1 w-fit">
                        <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                        <P14 className="font-bold">$MON</P14>
                    </div>

                    <div className="flex items-center gap-2 justify-between mt-2.5">
                        <div className="space-y-2">
                            <H1 className={`font-bold ${claimAmount ? 'text-gray-80' : 'text-gray-70'}`}>{claimAmount}</H1>
                            <P16 className="font-medium text-gray-70">$0.00</P16>
                        </div>
                        <Button size="sm" className="rounded" onClick={() => onClaim()}>Claim</Button>
                    </div>
                </div>
            </div>
        </>
    )
}