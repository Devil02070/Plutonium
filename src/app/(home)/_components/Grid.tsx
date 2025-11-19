'use client'
import BorderEdges from "@/components/BorderEdges";
import { H3, P12, P14, P16 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { handleKeyPress } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineWallet } from "react-icons/md";
import { motion } from 'framer-motion'
import { toast } from "sonner";

export default function Grid() {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [amount, setAmount] = useState('')
    const [totalAmount, setTotalAmount] = useState(0)
    const [timer, setTimer] = useState(0)

    const [amountBoxes, setAmountBoxes] = useState<number[]>([])
    const [winningIndex, setWinningIndex] = useState<number | null>(null);
    const [isEnded, setIsEnded] = useState(false);
    const [showWinner, setShowWinner] = useState(false);

    const [users, setUsers] = useState<number[]>([])
    const [amounts, setAmounts] = useState<string[]>([])

    const toggleSelected = (index: number) => {
        setSelectedIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        )
    }
    const handleDeposit = async () => {
        try {
            console.log('selected blocks', selectedIndexes)
            setAmountBoxes((prev) => Array.from(new Set([...prev, ...selectedIndexes])));
            setSelectedIndexes([])
            toast.success(`deposit success ${amountBoxes}`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const selectedBoxes = selectedIndexes.length;
        setTotalAmount(selectedBoxes * Number(amount))
    }, [amount, selectedIndexes])

    useEffect(() => {
        const users = Array.from({ length: 25 }, () => Math.floor(Math.random() * 500));
        const amounts = Array.from({ length: 25 }, () =>
            (Math.random() * 9000 + 100).toFixed(2)
        );
        setUsers(users)
        setAmounts(amounts)
    }, [])

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }

        if (timer === 0 && winningIndex === null) {
            const randomWinner = Math.floor(Math.random() * 25);
            setWinningIndex(randomWinner);
            setIsEnded(true);

            // show glow after fade
            setTimeout(() => setShowWinner(true), 3000);

            // reset grid after whole sequence
            setTimeout(() => {
                setWinningIndex(null);
                setShowWinner(false);
                setIsEnded(false);
                setSelectedIndexes([])
                setAmountBoxes([])
                setTimer(30);
            }, 8000);
        }
    }, [timer]);

    return (
        <>
            {/* Game status */}
            <RoundStats timer={timer} />

            {/* Game */}
            <div className="grid grid-cols-5 gap-1 lg:gap-2.5 h-fit mt-4">
                {Array.from({ length: 25 }).map((_, i) => {
                    const isSelected = selectedIndexes.includes(i);
                    const isWinner = winningIndex === i;
                    const randomDelay = Math.random() * 2; // stagger fade
                    const hasAmount = amountBoxes.includes(i)
                    const isDepositedSelected = hasAmount && isSelected;

                    const edgesColor = isWinner && showWinner ? '#A2F512' : isDepositedSelected ? '#ffffff' : hasAmount ? '#1297F5' : isSelected ? '#ffffff' : '#ffffff80'
                    const borderColor = isWinner && showWinner ? 'border-light-green' : isDepositedSelected ? 'border-white' : hasAmount ? 'border-primary-light' : isSelected ? 'border-white' : 'border-gray-40'
                    const bgColor = isWinner && showWinner ? 'bg-dark-green' : isDepositedSelected ? 'bg-background' : hasAmount ? 'bg-primary-dark' : isSelected ? 'bg-background' : 'bg-black-2'

                    const total = Number(amounts[i]) ? Number(amounts[i]) : 0
                    const formattedNumber = (total >= 1000) ? `${(total / 1000).toFixed(2)} K` : `${total.toFixed(2)}`;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 1, scale: 1 }}
                            animate={
                                isEnded
                                    ? isWinner
                                        ? { opacity: 1, scale: 1 }
                                        : { opacity: 0, scale: 0.8 }
                                    : { opacity: 1, scale: 1 }
                            }
                            transition={
                                isEnded && !isWinner
                                    ? { duration: 2, delay: randomDelay }
                                    : { duration: 3 }
                            }
                            onClick={() => toggleSelected(i)}
                        >
                            <BorderEdges key={i} padding={2} cornerThickness={6} cornerColor={`${edgesColor}`} cornerSize={1} className="w-full">
                                <div className={`p-1 md:p-2 border cursor-pointer text-center space-y-2.5 ${bgColor} ${borderColor}`}>
                                    <P14 className="text-dark-gray font-normal hidden md:block">#{i + 1}</P14>
                                    <P12 className="text-dark-gray font-normal md:hidden">#{i + 1}</P12>
                                    <H3 className="font-bold">{formattedNumber}</H3>
                                    <P12 className={`flex items-center font-medium mx-auto w-fit gap-2 p-1 rounded-sm bg-gray-30 text-gray-80`}>
                                        <LuUserRound size={12} /> {users[i]}
                                    </P12>
                                </div>
                            </BorderEdges>
                        </motion.div>
                    );
                })}
            </div>


            {/* Inputs */}
            <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3.5 w-full">
                    <div className="flex items-center gap-4 border-[1.5px] border-gray-40 px-4 py-2 w-full">
                        <input
                            type="text"
                            placeholder="0.00"
                            className="text-2xl font-bold w-full focus:outline-none"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            inputMode="decimal"
                            onKeyDown={handleKeyPress}
                        />
                        <div className="flex items-center gap-1">
                            <MdOutlineWallet size={30} />
                            <P14 className="font-semibold">0.00</P14>
                            <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                        </div>
                    </div>
                    <BorderEdges cornerColor="#1297F5" cornerThickness={2} padding={4}>
                        <Button
                            onClick={() => handleDeposit()}
                            disabled={!amount || !selectedIndexes || timer === 0}
                        >Deposit</Button>
                    </BorderEdges>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 w-full">
                    {["5000", "10000", "50000", "100000", '150000', '200000'].map((val) => (
                        <Button
                            key={val}
                            variant="outline"
                            size="sm"
                            className="hover:bg-primary hover:text-background cursor-pointer text-sm"
                            onClick={() => setAmount(val)}
                        >
                            +{Number(val) / 1000}K
                        </Button>
                    ))}
                </div>

                <div className="bg-gray-30 rounded px-3 py-3.5 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                        <P12 className="text-gray-60 font-medium">Block</P12>
                        <P16 className="font-bold">x{selectedIndexes.length}</P16>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <P12 className="text-gray-60 font-medium">Total Deposit</P12>
                        <P16 className="font-bold">{totalAmount}</P16>
                    </div>
                </div>
            </div>
        </>
    )
}

const RoundStats = ({ timer }: { timer: number }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-13 text-center w-full border-[1.5px] border-gray-40 p-2">
            <BorderEdges cornerColor="#6E54FF" cornerThickness={2}>
                <div className="p-2 space-y-2.5 text-center">
                    <P12 className="text-gray-70 font-medium">Powerhouse</P12>
                    <div className="flex items-center gap-2 justify-center">
                        <Image src="/media/logo-icon.svg" alt="logo" height={20} width={20} className="rounded-full" />
                        <P16 className="font-bold">80.34</P16>
                    </div>
                </div>
            </BorderEdges>
            <div className="p-2 space-y-2.5 text-center">
                <P12 className="text-gray-70 font-medium">Time Remaining</P12>
                <P16 className="font-bold text-base-red">00:{timer}</P16>
            </div>
            <div className="p-2 space-y-2.5 text-center">
                <P12 className="text-gray-70 font-medium">Total Deposit</P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">80.34</P16>
                </div>
            </div>
            <div className="p-2 space-y-2.5 text-center">
                <P12 className="text-gray-70 font-medium">Your Deposit</P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">80.34</P16>
                </div>
            </div>
        </div>
    )
}