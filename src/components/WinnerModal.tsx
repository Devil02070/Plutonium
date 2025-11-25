'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { H1, P12, P16 } from "./typography"
import BorderEdges from "./BorderEdges"
import Image from "next/image"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { EventData } from "@/utils/types"
import { useAppKitAccount } from "@reown/appkit/react"
import { BigNumber, ethers } from "ethers"

interface WinnerModalProps {
    gameEndData: EventData
}
export default function WinnerModal({ gameEndData }: WinnerModalProps) {
    const { address } = useAppKitAccount()
    const [open, setOpen] = useState(false)

    const [monAmount, setMonAmount] = useState(0)
    const [pltAmount, setPltAmount] = useState(0)
    const [rarity, setRarity] = useState<'normal' | 'jackpot' | 'rare'>('normal')

    const [hasShown, setHasShown] = useState(false)

    useEffect(() => {
        if (!gameEndData || !address) return;
        const winnerIndex = gameEndData.users.findIndex(
            (user: string) => user.toLowerCase() === address.toLowerCase()
        );
        console.log('winnerIndex', winnerIndex)
        const hasWinner = winnerIndex !== -1;
        console.log('hasWinner', hasWinner)

        if (hasWinner) {
            setHasShown(true);
            setOpen(true)
            const monReward = gameEndData.amounts[winnerIndex]
            const formattedMonReward = ethers.utils.formatEther(`${monReward}`);
            setMonAmount(Number(formattedMonReward));

            const isOnePltWinner = gameEndData.one_plt_winner;
            // console.log('onePltwinner', isOnePltWinner)
            const iscurrentUserPltWinner = isOnePltWinner === address;
            // console.log('iscurrentUserPltWinner', iscurrentUserPltWinner)

            const plt_splitSmount = gameEndData.plt[winnerIndex]
            if (iscurrentUserPltWinner) {
                const formattedPltAmount = ethers.utils.formatEther(`${gameEndData.one_plt_winner_amt}`);
                setPltAmount(Number(formattedPltAmount))
                setRarity('rare')
                console.log('single amount', gameEndData.one_plt_winner_amt)
            } else {
                if (plt_splitSmount) {
                    const formattedPltSplitAmount = ethers.utils.formatEther(`${plt_splitSmount}`);
                    setPltAmount(Number(formattedPltSplitAmount))
                    setRarity('rare')
                    console.log('split amount', gameEndData.plt[winnerIndex])
                }
            }

            const jackpotAmount = Number(gameEndData.powerhouse[winnerIndex] ?? 0);
            console.log('isjackpot', jackpotAmount)
            if (jackpotAmount > 0) {
                setRarity('jackpot')
                const total = pltAmount + jackpotAmount;
                const formattedTotal = ethers.utils.formatEther(`${total}`);
                setPltAmount(Number(formattedTotal))
                console.log('jackpot amount', pltAmount, jackpotAmount)
            }
        }
    }, [gameEndData, address, hasShown])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent showCloseButton={false} className="p-0 space-y-0 border-0" >
                <DialogHeader className="hidden"><DialogTitle>{''}</DialogTitle></DialogHeader>
                <BorderEdges cornerSize={14}>
                    {rarity === 'rare' && <Rare monAmount={monAmount} pltAmount={pltAmount} />}
                    {rarity === 'jackpot' && <Jackpot monAmount={monAmount} pltAmount={pltAmount} />}
                    {rarity === 'normal' && <Normal monAmount={monAmount} />}
                </BorderEdges>
            </DialogContent>
        </Dialog>
    )
}

const Rare = ({ monAmount, pltAmount }: { monAmount: number, pltAmount: number }) => {
    return (
        <div className="space-y-6 text-center p-6">
            <H1 className="font-bold">Winner!</H1>
            <P16 className="leading-6">You won <span className="text-[#F7BA31]">{monAmount} $ MON </span> plus  {pltAmount} PLT bonus. You were selected for the bonus reward this round.</P16>
            <Image src="/media/rare.svg" alt="rare-img" height="224" width="333" className="w-fit mx-auto" />
            <BorderEdges cornerColor="#1297F5" padding={3}>
                <Button>Back to Game</Button>
            </BorderEdges>
            <P12>A rare hit - enjoy it.</P12>
        </div>
    )
}

const Jackpot = ({ monAmount, pltAmount }: { monAmount: number, pltAmount: number }) => {
    return (
        <div className="space-y-6 text-center p-6">
            <H1 className="font-bold">Winner!</H1>
            <P16 className="leading-6">You won <span className="text-primary">{monAmount} $ MON</span>  plus {pltAmount} PLT  from the Power House.  Your block hit the jackpot this round.</P16>
            <Image src="/media/jackpot.svg" alt="rare-img" height="224" width="333" className="w-fit mx-auto" />
            <BorderEdges cornerColor="#1297F5" padding={3}>
                <Button>Back to Game</Button>
            </BorderEdges>
            <P12>Hit the jackpot.</P12>
        </div>
    )
}

const Normal = ({ monAmount }: { monAmount: number }) => {
    return (
        <div className="space-y-6 text-center p-6">
            <H1 className="font-bold">Winner!</H1>
            <P16 className="leading-6">You won <span className="text-[#A2F512]">{monAmount} $ MON</span>. Your deposit was on the winning block. </P16>
            <Image src="/media/normal.svg" alt="rare-img" height="224" width="333" className="w-fit mx-auto" />
            <BorderEdges cornerColor="#1297F5" padding={3}>
                <Button>Back to Game</Button>
            </BorderEdges>
            <P12>Block Win.</P12>
        </div>
    )
}