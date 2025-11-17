'use client'
import { P12, P16 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoSendOutline } from "react-icons/io5";

export default function Chat() {
    return (
        <div className="p-4 relative border-r border-dashed border-gray-30 h-[calc(100vh-80px)] md:h-[calc(100vh-120px)]">
            {
                <div className="h-full overflow-y-auto scrollbar-hide space-y-4">
                    {
                        Array.from({ length: 20 }).map((_, i) => {
                            return (
                                <div key={i} className="space-y-2 w-full relative">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-5 w-5 rounded-full bg-dark-blue"></div>
                                            <P12 className="text-gray-70 font-bold">XZ5...31I</P12>
                                        </div>
                                        <P12 className="text-gray-70 font-medium">5:00 PM</P12>
                                    </div>
                                    <P16 className="text-neutral-10 px-2 leading-6">Limited time offer on selected items, don't miss out!</P16>
                                </div>
                            )
                        })
                    }
                </div>
            }

            <div className="h-fit absolute bottom-0 w-full left-0 bg-background px-4">
                <div className="rounded p-2 flex items-center gap-2 bg-gray-30">
                    <div className="w-full">
                        <input
                            type="text"
                            name="content"
                            className="w-full focus:outline-none"
                            placeholder="Enter message"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button size="sm" >
                            <IoSendOutline />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}