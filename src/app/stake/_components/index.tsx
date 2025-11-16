'use client'
import BorderEdges from "@/components/BorderEdges";
import { P12, P14, P16 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { handleKeyPress } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineWallet } from "react-icons/md";

export default function Body() {
    const [active, setActive] = useState<'stake' | 'unstake'>('stake')
    return (
        <section
            className="py-10 px-4 bg-no-repeat bg-center"
            style={{ backgroundImage: 'url("/media/stake-bg.svg")' }}
        >
            <div className="w-full max-w-md mx-auto space-y-4">
                <div className="bg-gray-30 p-3.25 rounded-md space-y-2.5 backdrop-blur-[6px]">
                    <div className="flex items-center justify-between">
                        <P12 className="text-gray-70 flex items-center gap-2">Total Staked <AiOutlineQuestionCircle size={14} /></P12>
                        <div className="flex items-center gap-2 justify-center">
                            <Image src="/media/Vector.svg" alt="logo" height={16} width={16} className="rounded-full" />
                            <P16 className="font-bold">{(342323.6).toLocaleString()}</P16>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <P12 className="text-gray-70 flex items-center gap-2">Your Stakes <AiOutlineQuestionCircle size={14} /></P12>
                        <div className="flex items-center gap-2 justify-center">
                            <Image src="/media/Vector.svg" alt="logo" height={16} width={16} className="rounded-full" />
                            <P16 className="font-bold">{(83.3).toLocaleString()}</P16>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <P12 className="text-gray-70 flex items-center gap-2">Total Yield <AiOutlineQuestionCircle size={14} /></P12>
                        <div className="flex items-center gap-2 justify-center">
                            <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                            <P16 className="font-bold">{(83.3).toLocaleString()}</P16>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <P12 className="text-gray-70 flex items-center gap-2">APR <AiOutlineQuestionCircle size={14} /></P12>
                        <P16 className="font-bold">7.16% APY</P16>
                    </div>
                    <div className="flex items-center justify-between">
                        <P12 className="text-gray-70 flex items-center gap-2">TVL <AiOutlineQuestionCircle size={14} /></P12>
                        <P16 className="font-bold">${(342423423).toLocaleString()}</P16>
                    </div>
                </div>

                {/* Stake/ Unstake form */}
                <BorderEdges className="w-full">
                    <div className="bg-primary-dark p-2.5 w-full">
                        <div className="bg-gray-20 px-2 py-1.5 rounded w-fit mx-auto">
                            <BorderEdges cornerColor={active === 'stake' ? '#1297F5' : '#FFFFFF0A'} cornerSize={6} cornerThickness={1.5}>
                                <P16 className={`py-1 px-3 cursor-pointer ${active === 'stake' ? 'text-primary' : ''}`} onClick={() => setActive('stake')}>Stake</P16>
                            </BorderEdges>
                            <BorderEdges cornerColor={active === 'unstake' ? '#1297F5' : '#FFFFFF0A'} cornerSize={6} cornerThickness={1.5}>
                                <P16 className={`py-1 px-3 cursor-pointer ${active === 'unstake' ? 'text-primary' : ''}`} onClick={() => setActive('unstake')}>Unstake</P16>
                            </BorderEdges>
                        </div>

                        {
                            active === 'stake' &&
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
                                                    <P14 className="font-semibold">{(83.3).toLocaleString()}</P14>
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
                                                    />
                                                    <P16 className="font-medium text-gray-70">$0.00</P16>
                                                </div>
                                                <Button size="sm" className="rounded">Max</Button>
                                            </div>
                                        </div>
                                    </BorderEdges>
                                    <div className="text-center mt-2">
                                        <BorderEdges padding={3} cornerColor="#1297F5" cornerThickness={1.5} className="mx-auto w-fit">
                                            <Button className="mx-auto w-fit">Stake</Button>
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
                                                <input
                                                    type="text"
                                                    placeholder="0.00"
                                                    className="text-[28px] font-bold focus:outline-none w-full"
                                                    onKeyDown={handleKeyPress}
                                                    inputMode="decimal"
                                                />
                                                <P16 className="font-medium text-gray-70">$0.00</P16>
                                            </div>
                                            <Button size="sm" className="rounded">Claim</Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            active === 'unstake' &&
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
                                                    className="text-[28px] font-bold focus:outline-none w-full"
                                                    onKeyDown={handleKeyPress}
                                                    inputMode="decimal"
                                                />
                                                <P16 className="font-medium text-gray-70">$0.00</P16>
                                            </div>
                                            <Button size="sm" className="rounded">Max</Button>
                                        </div>
                                    </div>
                                </BorderEdges>
                                <div className="text-center mt-2">
                                    <BorderEdges padding={3} cornerColor="#1297F5" cornerThickness={1.5} className="mx-auto w-fit">
                                        <Button className="mx-auto w-fit">Unstake</Button>
                                    </BorderEdges>
                                </div>
                            </div>
                        }
                    </div>
                </BorderEdges>
            </div>
        </section>
    )
}