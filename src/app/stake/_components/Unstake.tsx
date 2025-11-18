'use client'
import BorderEdges from "@/components/BorderEdges";
import { P12, P14, P16 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { handleKeyPress } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function Unstake() {
    const [amount, setAmount] = useState('');
    const stakedBalance = 20;
    const onUnstake = async () => {
        try {
            console.log('unstake amount', amount)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="space-y-2 mt-6">
            <P12>Unstake</P12>
            <BorderEdges padding={2} cornerColor="#1297F5" cornerThickness={1.5} className="w-full">
                <div className="bg-gray-30 p-3.25">
                    <div className="flex items-center justify-between gap-2">
                        <div className="bg-primary-dark rounded flex items-center gap-1 justify-center p-1">
                            <Image src="/media/Vector.svg" alt="logo" height={16} width={16} className="rounded-full" />
                            <P14 className="font-bold">log</P14>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 justify-between mt-2.5">
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="text-[28px] font-bold focus:outline-none w-full"
                                onKeyDown={handleKeyPress}
                                inputMode="decimal"
                            />
                            <P16 className="font-medium text-gray-70">$0.00</P16>
                        </div>
                        <Button size="sm" className="rounded" onClick={() => setAmount(stakedBalance.toString())}>Max</Button>
                    </div>
                </div>
            </BorderEdges>
            <div className="text-center mt-2">
                <BorderEdges padding={3} cornerColor="#1297F5" cornerThickness={1.5} className="mx-auto w-fit">
                    <Button className="mx-auto w-fit" onClick={() => onUnstake()}>Unstake</Button>
                </BorderEdges>
            </div>
        </div>
    )
}