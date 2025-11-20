'use client'
import BorderEdges from "@/components/BorderEdges";
import { P12, P14, P16 } from "@/components/typography";
import Stats from "./Stats";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdOutlineWallet } from "react-icons/md";
import { useState } from "react";
import { handleKeyPress } from "@/lib/utils";
import SaleProgressBar from "./SaleProgressBar";

export default function Body() {
    const MonBalance = 34;
    const tokenBalance = 40;

    const [sellingAmount, setSellingAmount] = useState('')
    const saleProgress = 50

    const handleBuy = async () => {
        try {
            console.log('selling Amount', sellingAmount)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section
            className="px-4 bg-no-repeat bg-center"
            style={{ backgroundImage: 'url("/media/stake-bg.svg")' }}
        >
            <div className="w-full max-w-md mx-auto space-y-4">
                {/*Stats */}
                <Stats />

                <div className="space-y-2">
                    <SaleProgressBar progress={saleProgress} />
                    <P14 className="font-bold text-gray-70 text-end">Sale progress {saleProgress}%</P14>
                </div>

                {/* Stake/ Unstake form */}
                <BorderEdges className="w-full">
                    <div className="bg-primary-dark p-2.5 w-full">
                        <div className="bg-gray-20 px-2 py-1.5 rounded w-fit mx-auto">
                            <BorderEdges cornerColor='#1297F5' cornerSize={6} cornerThickness={1.5}>
                                <P16 className={`py-1 px-3 cursor-pointer text-primary`}>Stake</P16>
                            </BorderEdges>
                        </div>

                        <div className="space-y-2 mt-6">
                            <P12>selling</P12>
                            <BorderEdges padding={2} cornerColor="#1297F5" cornerThickness={1.5} className="w-full">
                                <div className="bg-gray-30 p-3.25">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="bg-primary-dark rounded flex items-center gap-1 justify-center p-1">
                                            <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                            <P14 className="font-bold">$MON</P14>
                                        </div>
                                        <div className="flex items-center gap-2 justify-center">
                                            <MdOutlineWallet size={14} />
                                            <P14 className="font-semibold">{(MonBalance).toLocaleString()}</P14>
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
                                                value={sellingAmount}
                                                onChange={(e) => setSellingAmount(e.target.value)}
                                            />
                                            <P16 className="font-medium text-gray-70">$0.00</P16>
                                        </div>
                                        <Button size="sm" className="rounded cursor-pointer">Max</Button>
                                    </div>
                                </div>
                            </BorderEdges>
                        </div>

                        <div className="space-y-2 mt-6">
                            <P12>buying</P12>
                            <BorderEdges padding={2} cornerColor="#1297F5" cornerThickness={1.5} className="w-full">
                                <div className="bg-gray-30 p-3.25">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="bg-primary-dark rounded flex items-center gap-1 justify-center p-1">
                                            <Image src="/media/logo-icon.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                            <P14 className="font-bold">$PLT</P14>
                                        </div>
                                        <div className="flex items-center gap-2 justify-center">
                                            <MdOutlineWallet size={14} />
                                            <P14 className="font-semibold">{(tokenBalance).toLocaleString()}</P14>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-between mt-2.5">
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                placeholder="0.00"
                                                className="text-[28px] font-bold focus:outline-none w-full"
                                                readOnly
                                            />
                                            <P16 className="font-medium text-gray-70">$0.00</P16>
                                        </div>
                                    </div>
                                </div>
                            </BorderEdges>
                        </div>

                        <div className="text-center mt-2">
                            <BorderEdges padding={3} cornerColor="#1297F5" cornerThickness={1.5} className="mx-auto w-fit">
                                <Button className="mx-auto w-fit" onClick={() => handleBuy()}>Buy</Button>
                            </BorderEdges>
                        </div>

                    </div>
                </BorderEdges>
            </div>
        </section>
    )
}