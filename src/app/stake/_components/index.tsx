'use client'
import BorderEdges from "@/components/BorderEdges";
import { P16 } from "@/components/typography";
import { useState } from "react";
import StakeStats from "./StakeStats";
import Stake from "./Stake";
import Unstake from "./Unstake";

export default function Body() {
    const [active, setActive] = useState<'stake' | 'unstake'>('stake')
    return (
        <section
            className="px-4 bg-no-repeat bg-center"
            style={{ backgroundImage: 'url("/media/stake-bg.svg")' }}
        >
            <div className="w-full max-w-md mx-auto space-y-4">
                {/*Stats */}
                <StakeStats />

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

                        {active === 'stake' && <Stake />}
                        {active === 'unstake' && <Unstake />}
                    </div>
                </BorderEdges>
            </div>
        </section>
    )
}