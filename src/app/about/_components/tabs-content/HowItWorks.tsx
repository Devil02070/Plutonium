import { H1, H3, P14 } from "@/components/typography";

export default function HowItWorks() {

    const Rounds = [
        { id: 1, desc: 'Each round runs for one minute.' },
        { id: 2, desc: 'Miners place $MON  on any block inside a  5x5 grid  (25 total mining spots).' },
        { id: 3, desc: 'When the timer hits zero, the Chainlink vrf to select  One winning mining block.' },
        { id: 4, desc: 'When the timer hits zero, the Chainlink vrf to select  One winning mining block.' },
    ]
    const MiningOutcome = [
        { id: 1, desc: 'All $MON placed on non-winning blocks is redistributed to Miners who picked the winning block.' },
        { id: 2, desc: 'Distribution is proportional to how much space they claimed there.' },
        { id: 3, desc: 'Every round also mints +0.2 PLT as fresh and this will add up in in powerhouse.' },
        { id: 4, desc: 'Every round also mints +1 PLT as fresh' },
        {
            id: 5, desc: 'Typically, that PLT is shared among winner Miners who were on the winning block in following way',
            subitems: [
                { id: 1, desc: 'Either chosen randomly any one  miner gets the entire 1 PLT vein.' },
                { id: 2, desc: ' Or split weighted by their claim size  in the winners block gets the entire 1 PLT vein.' },
            ]
        },
    ]
    const PowerHouse = [
        { id: 1, desc: 'Every round, 0.2 PLT is deposited into the Power House that is minted in every round.' },
        { id: 2, desc: "There's a 1 in 625 chance that the winning block also cracks open the Power House vein." },
        {
            id: 3, desc: 'If it triggers:',
            subitems: [
                { id: 1, desc: 'The entire stored PLT is released and shared with the winning Miners, proportional to their claim.' },
            ]
        },
        {
            id: 4, desc: "If it doesn't trigger:",
            subitems: [
                { id: 1, desc: 'The Power House keeps adding up, creating a heavier and heavier jackpot.' },
            ]
        },
    ]
    return (
        <section className="space-y-6">
            <header className="space-y-1.5">
                <H1 className="font-bold">How Plutonium Works </H1>
                <P14 className="text-gray-60">Learn about the protocol.</P14>
            </header>

            <div className="space-y-4">
                <H3 className="font-bold">Rounds</H3>
                {
                    Rounds.map((r, i) => {
                        return (
                            <div key={r.id} className="flex items-start gap-4">
                                <div className="p-1.5 rounded-full bg-primary mt-1"></div>
                                <P14>{r.desc}</P14>
                            </div>
                        )
                    })
                }
            </div>

            <div className="space-y-4">
                <H3 className="font-bold">Mining Outcome</H3>
                {
                    MiningOutcome.map((r, i) => {
                        return (
                            <div key={r.id} className="flex items-start gap-4">
                                <div className="p-1.5 rounded-full bg-primary mt-1"></div>
                                <div className="space-y-4">
                                    <P14>{r.desc}</P14>
                                    {
                                        r.subitems &&
                                        r.subitems.map((sub, i) => {
                                            return (
                                                <div key={sub.id + i} className="flex items-center gap-4">
                                                    <div className="p-1.5 rounded-full bg-primary-dark border border-primary mt-1"></div>
                                                    <P14>{sub.desc}</P14>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="space-y-4">
                <H3 className="font-bold">Power House</H3>
                {
                    PowerHouse.map((r, i) => {
                        return (
                            <div key={r.id} className="flex items-start gap-4">
                                <div className="p-1.5 rounded-full bg-primary mt-1"></div>
                                <div className="space-y-4">
                                    <P14>{r.desc}</P14>
                                    {
                                        r.subitems &&
                                        r.subitems.map((sub, i) => {
                                            return (
                                                <div key={sub.id + i} className="flex items-center gap-4">
                                                    <div className="p-1.5 rounded-full bg-primary-dark border border-primary mt-1"></div>
                                                    <P14>{sub.desc}</P14>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </section >
    )
}