'use client'
import { H1, P12 } from "@/components/typography";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { socket } from "@/utils/socket-io-client";
import { formatTinyEth, shortenAddress } from "@/lib/utils";
import { ethers } from "ethers";
import { EventData } from "@/utils/types";
import WinnerModal from "@/components/WinnerModal";

export default function Winners() {
    const [gameEndData, setGameEndData] = useState<EventData[]>()
    useEffect(() => {
        let setDataTimeout: NodeJS.Timeout;
        let clearDataTimeout: NodeJS.Timeout;

        const gamehandler = (data: EventData[]) => {
            console.log("gameevent", data);

            // Clear previous pending timeouts
            if (setDataTimeout) clearTimeout(setDataTimeout);
            if (clearDataTimeout) clearTimeout(clearDataTimeout);

            // Wait 6 seconds before applying data
            setDataTimeout = setTimeout(() => {
                setGameEndData(data);

                // After data is set, wait 10 seconds then clear it
                clearDataTimeout = setTimeout(() => {
                    setGameEndData(undefined);
                }, 60000);
            }, 8000);
        };
        socket.on("minted", gamehandler);

        return () => {
            socket.off("minted", gamehandler);
            clearTimeout(setDataTimeout);
            clearTimeout(clearDataTimeout);
        };
    }, []);
    return (
        <>
            <H1 className="lg:text-end">Winners</H1>
            <div className="mt-4 pt-0 relative overflow-y-auto">
                <Table className="w-full lg:w-max xl:w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead >
                                <P12 className="text-gray-70">Users</P12>
                            </TableHead>
                            <TableHead >
                                <P12 className="text-gray-70">Invested</P12>
                            </TableHead>
                            <TableHead className="text-end">
                                <P12 className="text-gray-70">Won</P12>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {
                        !gameEndData ?
                            <TableBody>
                                <TableRow className={`hover:bg-black border-b-0 bg-background`} >
                                    <TableCell className="text-center"></TableCell>
                                </TableRow>
                            </TableBody>
                            :
                            <TableBody>
                                {
                                    gameEndData[0].users.map((user, i) => {
                                        const reward = gameEndData[0].amounts[i];
                                        const isOneWinner = gameEndData[0].one_plt_winner ?? undefined

                                        const plt_reward = gameEndData[0].one_plt_winner_amt;
                                        const split_plt_reward = gameEndData[0].plt[i]

                                        const formattedReward = reward ? ethers.formatEther(reward) : "0";

                                        return (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <P12 className="font-medium text-gray-70">{shortenAddress(user)}</P12>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1 px-2">
                                                        <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                                        <P12 className="font-bold">-</P12>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Image src="/media/logo-icon.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                                        {
                                                            !isOneWinner ?
                                                                <P12 className="font-bold">{plt_reward} +</P12>
                                                                : (user === isOneWinner) ?
                                                                    <P12 className="font-bold">{split_plt_reward} +</P12>
                                                                    : '-'
                                                        }
                                                        <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                                        {/* <P12 className="font-bold">{formatTinyEth(reward)}</P12> */}
                                                        <P12 className="font-bold">{formatTinyEth(Number(formattedReward))}</P12>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }

                            </TableBody>
                    }
                </Table>
            </div>
            {
                gameEndData &&
                <WinnerModal gameEndData={gameEndData[0]} />
            }
            {/* {gameEndData &&
                <>
                    {
                        gameEndData[0].users.map((user, i) => {
                            const isWinner = user === address;
                            
                            const monRewardAmount = gameEndData[0].amounts[i];
                            const isOneWinner = gameEndData[0].one_plt_winner ?? undefined

                            const plt_reward = gameEndData[0].one_plt_winner_amt;
                            const split_plt_reward = gameEndData[0].plt[i]

                            // const formattedReward = reward ? ethers.formatEther(reward) : "0";
                            if(!isWinner) return;
                            
                            return (
                                <WinnerModal monAmount={monRewardAmount} pltAmount={split_plt_reward} open={true}   />
                            )
                        })
                    }
                </>
            } */}





            {/* {
                            Array.from({ length: 20 }).map((_, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <P12 className="font-medium text-gray-70">XZ5...32N</P12>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 px-2">
                                                <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                                <P12 className="font-bold">78.4</P12>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-end gap-1">
                                                <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                                <P12 className="font-bold">78.4 +</P12>
                                                <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                                <P12 className="font-bold">48.4</P12>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        } */}
        </>
    )
}