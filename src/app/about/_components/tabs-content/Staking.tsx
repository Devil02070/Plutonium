import { H1, H3, P14 } from "@/components/typography"

export default function Staking() {
    const howitworks = [
        { id: 1, desc: 'When a Miner wins PLT   or $MON in a round' },
        { id: 2, desc: "The protocol automatically sends all winnings directly to the user's wallet, and every transfer is visible on the Monad explorer." },
        { id: 3, desc: 'During this payout, the system applies a 10% Refining Fee, paid in $MON.' },
        {
            id: 4, desc: 'From that Refining Fee:',
            subitems: [
                { id: 1, desc: '10% goes to Stakers' },
            ]
        },
    ]
    return (
        <section className="space-y-6">
            <header className="space-y-4">
                <H1 className="font-bold">Staking</H1>
                <P14 className="text-gray-70">Staking PLT gives holders a steady stream of yield powered by the Refining system.</P14>
            </header>

            <div className="space-y-4">
                <H3 className="font-bold">How it works</H3>
                {
                    howitworks.map((s, i) => {
                        return (
                            <div key={i} className="flex items-start gap-4">
                                <div className="p-1.5 rounded-full bg-primary mt-1"></div>
                                <div className="space-y-4">
                                    <P14>{s.desc}</P14>
                                    {
                                        s.subitems &&
                                        s.subitems.map((sub, i) => {
                                            return (
                                                <div key={sub.id + i} className="flex items-center gap-4">
                                                    <div className="p-1.5 rounded-full bg-primary-dark border border-primary mt-1"></div>
                                                    <P14>{sub.desc}</P14>
                                                </div>
                                            )
                                        })
                                    }
                                    <P14>This slice is paid in $MON and accumulates as staking yield.</P14>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section >
    )
}