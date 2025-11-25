'use client'

import backendApi from "@/utils/backendApi";
import { socket } from "@/utils/socket-io-client";
import { ChatData } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Chat from "./Chat";
import Grid from "./Grid";
import Winners from "./Winners";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HomePage() {
    const isMobile = useIsMobile()
    const [isChatSidebar, setIsChatSidebar] = useState(true)
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState<ChatData[]>([])

    const getChat = useCallback(async () => {
        try {
            setLoading(true)
            const res = await backendApi.getChats();
            console.log(res)
            setChats(res.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        getChat()
    }, [])

    useEffect(() => {
        // const chatHandler = (data: { data: ChatData }) => {
        const chatHandler = (data: ChatData[]) => {
            // console.log('newdata', data[0]);
            setChats((prevChats) => [data[0], ...prevChats]);
        };
        socket.on(`chat`, chatHandler);
        return () => {
            socket.off(`chat`, chatHandler);
        };
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsChatSidebar(false)
        }
    }, [isMobile])


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 md:gap-6 lg:gap-8 2xl:gap-15 pe-4 pb-14 md:pb-0 mt-6 px-4">
            <div className="col-span-1 md:h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
                {/* desktop chat */}
                <div className="col-span-1 h-[calc(100vh-150px)] hidden md:block relative">
                    <div
                        className={`absolute top-0 left-0 bg-foreground rounded p-2 text-background transition-all duration-500 ${isChatSidebar ? 'opacity-0' : 'opacity-full'}`}
                        onClick={() => setIsChatSidebar(!isChatSidebar)}
                    >
                        <BsChatDots size={16} />
                    </div>

                    <div className={`left-0 top-0 transitoin-all duration-500 ${isChatSidebar ? 'translate-x-0' : '-translate-x-[102%]'}`}>
                        <div className={`absolute z-90 top-0 right-0 bg-foreground rounded-l p-2 py-3 text-background`} onClick={() => setIsChatSidebar(!isChatSidebar)}>
                            <MdKeyboardDoubleArrowLeft size={16} />
                        </div>
                        <Chat chats={chats} loading={loading} />
                    </div>
                </div>

                {/* modile Chat */}
                <div className="md:hidden">
                    <div className={`fixed top-20 border border-gray-40 p-2 left-0 z-90 rounded-md transition-all duration-500 ${isChatSidebar ? 'bg-primary text-background hidden' : 'bg-background block'}`} onClick={() => setIsChatSidebar(!isChatSidebar)}>
                        <BsChatDots size={24} />
                    </div>
                    <div className={`bg-background border-r border-dashed border-gray-40 z-50 w-[80%] sm:w-[50%] md:w-[40%] fixed left-0 top-0 md:h-[calc(100vh-100px)] transitoin-all duration-500 ${isChatSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className={`absolute z-90 top-0 right-0 bg-foreground rounded-l p-2 py-3 text-background`} onClick={() => setIsChatSidebar(!isChatSidebar)}>
                            <MdKeyboardDoubleArrowLeft size={16} />
                        </div>
                        <Chat chats={chats} loading={loading} />
                    </div>
                </div>
            </div>

            <div className="col-span-2 md:h-[calc(100vh-120px)] pb-4 overflow-y-auto scrollbar-hide relative">
                <div className="relative z-20 max-w-2xl mx-auto">
                    <Grid />
                </div>
                <div className="lg:hidden mt-4 lg:mt-0 relative z-20">
                    <Winners />
                </div>
                {/* bg dots */}
                <div className="absolute inset-0 bg-size-[30px_30px] bg-[radial-gradient(#D9D9D910_2px,transparent_2px)]" />
            </div>

            <div className="col-span-1 hidden lg:block md:h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
                <Winners />
            </div>
        </div>
    )
}