import { H1, H3, P14 } from "@/components/typography"

export default function RefiningFee() {
    const Stakers = [
        { id: 1, desc: '10% percent becomes yield for PLT Stakers, available to claim directly from staking rewards.' },
        { id: 2, desc: 'This slice of the Refining Fee becomes direct $MON yield paid to stakers.' },
        { id: 3, desc: 'Stakers earn a cut of every Refining event network-wide.' },
    ]
    return (
        <section className="space-y-6">
            <header className="space-y-4">
                <H1 className="font-bold">Refining fee </H1>
                <P14 className="text-gray-70">When Miners claim their PLT, it passes through Refining, which applies a 10% refining fee.</P14>
            </header>

            <div className="space-y-4">
                <H3 className="font-bold">50% → Buyback</H3>
                <P14>When Miners claim their PLT, it passes through Refining, which applies a 10% refining fee.</P14>
                <div className="flex items-start gap-4">
                    <div className="p-1.5 rounded-full bg-primary mt-1"></div>
                    <P14>The protocol uses half of the Refining Fee to buy PLT from the market & burn</P14>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-1.5 rounded-full bg-primary mt-1"></div>
                    <P14>Burning permanently reduces supply, pushing long-term value upward.</P14>
                </div>
            </div>

            <div className="space-y-4">
                <H3 className="font-bold">40% → Grid Pool (we call it Market maker )</H3>
                <div className="flex items-start gap-4">
                    <div className="p-1.5 rounded-full bg-primary mt-1"></div>
                    <P14>This portion flows back into the mining grid, strengthening future rounds and keeping the ecosystem fueled.</P14>
                </div>
            </div>

            <div className="space-y-4">
                <H3 className="font-bold">10% → Stakers</H3>
                {
                    Stakers.map((s, i) => {
                        return (
                            <div key={i} className="flex items-start gap-4">
                                <div className="p-1.5 rounded-full bg-primary mt-1"></div>
                                <P14>{s.desc}</P14>
                            </div>
                        )
                    })
                }
            </div>
        </section >
    )
}