import { H1, H2, P12, P14 } from "@/components/typography";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { shortenAddress } from "@/lib/utils";
import Image from "next/image";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import { MiningData } from "@/utils/types";
import BorderEdges from "@/components/BorderEdges";
dayjs.extend(relativeTime)

type MiningTableProps = {
    mining: MiningData[]
}
export default function MiningTable({ mining }: MiningTableProps) {
    const tableHeadings = ['Users', 'Box', 'Token Winner', 'Winners', 'Deposit', 'Vaulted', 'Winnings', 'Powerhouse', 'Time']
    return (
        <section className="max-w-6xl mx-auto px-4 space-y-6 mt-11">
            <header className="space-y-1.5">
                <H1 className="font-bold">Mining</H1>
                <P14 className="text-gray-60">Recent mining activity</P14>
            </header>

            {
                mining.length === 0 ?
                    <BorderEdges className="w-full" cornerColor="#1297F5" padding={4} cornerSize={10}>
                        <div className="border border-gray-20 bg-primary-dark p-20">
                            <H2 className="text-gray-70 text-center">No Mining Data Yet.</H2>
                        </div>
                    </BorderEdges>
                    :
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {
                                    tableHeadings.map((item, i) => {
                                        const align = i === 0 ? 'text-start' : i === tableHeadings.length - 1 ? 'text-end' : 'text-center'
                                        return (
                                            <TableHead key={i}><P12 className={`text-gray-60 ${align}`}>{item}</P12></TableHead>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                mining.map((item, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <P12>#{item.id}</P12>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <P12>#{item.win_idx}</P12>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <P12>{item.plt_winner_addr ? shortenAddress(item.plt_winner_addr) : '-'}</P12>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <P12>{item.winners_count}</P12>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 justify-center px-2">
                                                    <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                                    <P12 className="font-bold">{item.deposit}</P12>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 justify-center px-2">
                                                    <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                                    <P12 className="font-bold">{item.vaulted}</P12>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 justify-center px-2">
                                                    <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                                    <P12 className="font-bold">{item.winnings}</P12>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {
                                                    item.powerhouse ?
                                                        <div className="flex items-center gap-2 justify-center">
                                                            <Image src="/media/logo-icon.svg" alt="logo" height={20} width={20} className="rounded-full" />
                                                            <P12 className="font-bold">{item.powerhouse}</P12>
                                                        </div>
                                                        :
                                                        <P12 className="font-bold">-</P12>
                                                }
                                            </TableCell>
                                            <TableCell className="text-end">
                                                <P12 className="text-gray-70"> {dayjs.unix(item.ts).fromNow()}</P12>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
            }
        </section>
    )
}