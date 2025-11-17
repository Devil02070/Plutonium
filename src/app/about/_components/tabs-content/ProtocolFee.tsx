import { H1, P14 } from "@/components/typography"

export default function ProtolFee() {
    const ProtolfeeData = [
        { id: 1, desc: 'Every time a Miner deposits $MON on any block in any round, the protocol charges a 1% Protocol Fee.' },
        { id: 2, desc: "Think of it as the cost of running the mine: every shovel of $MON placed into a block sends 1% to the protocol." },
        { id: 3, desc: 'This fee is separate from the Refining fee and triggers on deposit, not on claim.' },
        { id: 4, desc: "It's collected automatically and becomes part of the protocol's revenue stream, supporting long-term sustainability of the mining operation." },
    ]
    return (
        <section className="space-y-6">
            <header className="space-y-4">
                <H1 className="font-bold">Protol Fee</H1>
            </header>

            <div className="space-y-4">
                {
                    ProtolfeeData.map((s, i) => {
                        return (
                            <div key={i} className="flex items-start gap-4">
                                <div className="p-1.5 rounded-full bg-primary mt-1"></div>
                                <div className="space-y-4">
                                    <P14>{s.desc}</P14>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section >
    )
}