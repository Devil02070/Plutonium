'use client'
import { H1, P12 } from "@/components/typography";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

export default function Winners() {
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
                    <TableBody>
                        {
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
                        }
                    </TableBody>
                </Table>

            </div>
            {/* <div className="p-4 mt-4 pt-0 relative md:border-l border-dashed border-gray-30 overflow-y-auto">
                <div className="grid grid-cols-4 mt-4 gap-4 font-medium text-gray-70 pb-2">
                    <div className="col-span-1">
                        <P12 className="text-gray-70">Users</P12>
                    </div>
                    <div className="col-span-1">
                        <P12 className="text-gray-70">Invested</P12>
                    </div>
                    <div className="col-span-2 text-end">
                        <P12 className="text-gray-70">Won</P12>
                    </div>
                </div>
                {
                    Array.from({ length: 20 }).map((_, i) => {
                        return (
                            <div key={i} className="grid grid-cols-4 py-2 gap-4">
                                <div className="col-span-1">
                                    <P12 className="font-medium text-gray-70">XZ5...32N</P12>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex items-center gap-2">
                                        <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                        <P12 className="font-bold">78.4</P12>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex items-center justify-end gap-2">
                                        <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                        <P12 className="font-bold">78.4 +</P12>
                                        <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                                        <P12 className="font-bold">48.4</P12>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div> */}
        </>
    )
}