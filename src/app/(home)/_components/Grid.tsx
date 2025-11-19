'use client'
import BorderEdges from "@/components/BorderEdges";
import { H3, P12, P14, P16 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { formatTinyEth, handleKeyPress } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineWallet } from "react-icons/md";
import { motion } from 'framer-motion'
import { toast } from "sonner";
import useContract from "@/hooks/useContract";
import { ethers, parseEther } from "ethers";
import { socket } from "@/utils/socket-io-client";
import { Spinner } from "@/components/ui/spinner";
import RoundStats from "./RoundStats";
import { EventData } from "@/utils/types";

export default function Grid() {
    const { readContract, getWriteContract } = useContract();
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [amount, setAmount] = useState('')
    const [totalAmount, setTotalAmount] = useState(0)
    const [timer, setTimer] = useState(0)
    const [endTimestamp, setEndTimestamp] = useState(0)
    const [currentTimestamp, setCurrentTimestamp] = useState(0)
    const [gameEndData, setGameEndData] = useState<EventData[]>([]);

    const [amountBoxes, setAmountBoxes] = useState<number[]>([])
    const [winningIndex, setWinningIndex] = useState<number | null>(null);
    const [isEnded, setIsEnded] = useState(false);
    const [showWinner, setShowWinner] = useState(false);

    const [users, setUsers] = useState<number[]>([])
    const [amounts, setAmounts] = useState<string[]>([])
    const [gameStatus, setGameStatus] = useState(false)

    const [isDepositing, setIsDepositing] = useState(false)
    const getCurrentTimestamp = async () => {
        try {
            const browserProvider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/bab8e5589eb8429898ea91cc554d641f');
            const block = await browserProvider.getBlock("latest");
            console.log("current TS", block?.timestamp);
            setCurrentTimestamp(Number(block?.timestamp))
        } catch (err) {
            console.error("current ts error", err);
        }
    };
    const getEndTimestamp = async () => {
        try {
            const ts = await readContract.endGame();
            console.log('End TS', ts)
            setEndTimestamp(ts)
        } catch (err) {
            console.log("End ts error", err);
        }
    }
    const getGameStatus = async () => {
        try {
            const status = await readContract.isActive();
            console.log('game status', status)
            setGameStatus(status)
        } catch (err) {
            console.log("Status error", err);
        }
    }

    const getRoundDetails = async () => {
        try {
            const roundDetails = await readContract.getRoundDetails();
            const arr1 = Array.from(roundDetails[0]);
            const arr2 = Array.from(roundDetails[1]);

            const users = [...arr1].map(x => Number(x));
            const blockAmounts = [...arr2].map(x => String(x));

            // console.log('User Details 1', users)
            // console.log('Amounts Details 2', blockAmounts)

            setUsers(users)
            setAmounts(blockAmounts)
        } catch (err) {
            console.log("view error", err);
        }
    };

    const toggleSelected = (index: number) => {
        setSelectedIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        )
    }

    const handleDeposit = async () => {
        try {
            setIsDepositing(true)
            if (selectedIndexes.length === 0) {
                toast.error('selected blocks first')
                return;
            };
            const splitAmount = parseEther(amount.toString());
            const amountsPerBox = selectedIndexes.map(() => Number(splitAmount));
            // console.log('selected blocks', selectedIndexes)
            // console.log('amount blocks', amountsPerBox)

            const writeContract = await getWriteContract();
            if (!writeContract) {
                toast.error('null')
                return;
            };
            const transaction = await writeContract.stake(selectedIndexes, amountsPerBox, {
                value: splitAmount
            });
            console.log('write response', transaction)

            setAmountBoxes((prev) => Array.from(new Set([...prev, ...selectedIndexes])));
            setSelectedIndexes([])
        } catch (error) {
            console.log(error)
        } finally {
            setIsDepositing(false)
        }
    }

    useEffect(() => {
        const selectedBoxes = selectedIndexes.length;
        setTotalAmount(selectedBoxes * Number(amount))
    }, [amount, selectedIndexes])

    // remaining time
    useEffect(() => {
        if (endTimestamp && currentTimestamp) {
            const remaining_ts = Number(endTimestamp) - currentTimestamp;
            console.log(Number(endTimestamp), currentTimestamp);
            console.log('Remaining time:', remaining_ts);

            if (remaining_ts > 0) {
                setIsEnded(false);
                setTimer(remaining_ts);
            } else {
                setIsEnded(true);
                setTimer(0);
            }
        }
    }, [endTimestamp, currentTimestamp]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    useEffect(() => {
        if (timer === 0 && gameEndData && winningIndex === null) {
            const winnerBlock = gameEndData[0]?.block;
            // console.log('winning Block', winnerBlock)
            setWinningIndex(winnerBlock);
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
                setEndTimestamp(0)
                setCurrentTimestamp(0)

                //get new game 
                setGameStatus(false);
            }, 8000);
        }
    }, [gameEndData]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        // Start polling ONLY when status is false (game not active)
        if (gameStatus === false) {
            interval = setInterval(() => {
                getGameStatus();
            }, 3000);
        }

        // If game becomes active → stop polling
        if (gameStatus === true && interval) {
            clearInterval(interval);
            interval = undefined;
        }

        // Cleanup when component unmounts
        return () => {
            if (interval) clearInterval(interval);
        };

    }, [gameStatus]);

    useEffect(() => {
        //get new game 
        if (gameStatus === true) {
            getCurrentTimestamp();
            getEndTimestamp()
        }
    }, [gameStatus])

    useEffect(() => {
        getCurrentTimestamp();
        getEndTimestamp()
        getGameStatus()
    }, []);

    useEffect(() => {
        getRoundDetails();
        const interval = setInterval(() => {
            getRoundDetails();
        }, 5000)
        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
        // const gamehandler = (data: { data: EventData }) => {
        const gamehandler = (data: EventData[]) => {
            // console.log('gameEndData', data[0]);
            setGameEndData(data)
        };
        socket.on(`minted`, gamehandler);
        return () => {
            socket.off(`minted`, gamehandler);
        };
    }, []);


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
                    const formatted  = total ? ethers.formatEther(total) : 0;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 1, scale: 1 }}
                            animate={
                                isEnded && winningIndex
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
                                    <H3 className="font-bold">{formatTinyEth(Number(formatted))}</H3>
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
                            disabled={!amount || selectedIndexes.length === 0 || timer === 0}
                        >
                            {
                                isDepositing ? <Spinner /> : 'Deposit'
                            }
                        </Button>
                    </BorderEdges>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 w-full">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-primary hover:text-background cursor-pointer text-sm"
                        onClick={() => setAmount('0.00000001')}
                    >
                        0.00000001
                    </Button>
                    {["10000", "50000", "100000", '150000', '200000'].map((val) => (
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