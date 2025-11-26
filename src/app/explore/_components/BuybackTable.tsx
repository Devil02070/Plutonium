'use client'
import { H1, P12, P14, P16 } from "@/components/typography";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default function BuybackTable() {
    const tableHeadings = ['Time', 'MON Spent', 'IGO Buried', 'Stake Yield']
    return (
        <section className="max-w-6xl mx-auto px-4 space-y-6 mt-8 md:mt-11">
            <header className="space-y-1.5">
                <H1 className="font-bold">Buy Back</H1>
                <P14 className="text-gray-60">Review buyback transactions</P14>
            </header>

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
                        Array.from({ length: 5 }).map((_, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <P12> {dayjs.unix(1763351967).fromNow()}</P12>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 justify-center px-2">
                                            <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                            <P12 className="font-bold">8034.34</P12>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 justify-center px-2">
                                            <Image src="/media/logo-icon.svg" alt="logo" height={20} width={20} className="rounded-full" />
                                            <P12 className="font-bold">80.34</P12>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 justify-end">
                                            <Image src="/media/logo-icon.svg" alt="logo" height={20} width={20} className="rounded-full" />
                                            <P12 className="font-bold">80.34</P12>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </section>
    )
}