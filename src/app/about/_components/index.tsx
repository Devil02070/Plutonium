'use client'
import BorderEdges from "@/components/BorderEdges";
import { H1, P14 } from "@/components/typography";
import Image from "next/image";
import { useState } from "react";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import Intro from "./tabs-content/Intro";
import HowItWorks from "./tabs-content/HowItWorks";
import RefiningFee from "./tabs-content/RefiningFee";
import Staking from "./tabs-content/Staking";
import ProtolFee from "./tabs-content/ProtocolFee";
import Tokenomics from "./tabs-content/Tokenomics";
import Links from "./tabs-content/Links";

export default function Body() {
    const [currentTab, setCurrentTab] = useState(0)

    const tabs = ['Intro', 'How it works', 'Refining fee', 'Staking', 'Protocol fee', 'Tokenomics', 'Link']
    return (
        <section className="px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-7 max-w-7xl mx-auto gap-11">
                <div className="col-span-5 h-[calc(100vh-178px)] overflow-y-auto scrollbar-hide">

                    {currentTab === 0 && <Intro />}
                    {currentTab === 1 && <HowItWorks />}
                    {currentTab === 2 && <RefiningFee />}
                    {currentTab === 3 && <Staking />}
                    {currentTab === 4 && <ProtolFee />}
                    {currentTab === 5 && <Tokenomics />}
                    {currentTab === 6 && <Links />}

                    {/* navigation */}
                    <div className="flex items-center gap-4 justify-between py-2 mt-10">
                        {
                            currentTab > 0 ?
                                <P14 className="flex items-center gap-1 cursor-pointer hover:text-primary" onClick={() => setCurrentTab(currentTab - 1)}><RxArrowLeft size={14} />{tabs[currentTab - 1]}</P14>
                                :
                                <P14>{tabs[0]}</P14>
                        }
                        {
                            currentTab < (tabs.length - 1) ?
                                <P14 className="flex items-center gap-1 cursor-pointer hover:text-primary" onClick={() => setCurrentTab(currentTab + 1)}>{tabs[currentTab + 1]} <RxArrowRight size={14} /></P14>
                                :
                                <P14>{tabs[tabs.length - 1]}</P14>
                        }
                    </div>
                </div>

                <div className="col-span-2 relative hidden md:block">
                    <div className="space-y-5 grid justify-center">
                        {
                            tabs.map((tab, i) => {
                                return (
                                    <BorderEdges key={i} cornerColor={i === currentTab ? '#1297F5' : '#010101'} cornerSize={5} className="text-center w-fit mx-auto relative z-50">
                                        <P14 className={`w-30 py-1 cursor-pointer ${i === currentTab ? 'bg-primary-light text-primary' : ''}`} onClick={() => setCurrentTab(i)}>{tab}</P14>
                                    </BorderEdges>
                                )
                            })
                        }
                        {
                            Array.from({ length: tabs.length }).map((_, i) => {
                                if (i === currentTab) {
                                    return (
                                        <Image key={i} src={`/media/vec-${currentTab + 1}.svg`} alt="vector" height={600} width={600} className="absolute top-50 -left-40 opacity-80" />
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}