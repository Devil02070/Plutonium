'use client'
import { H2, P12, P16 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "@/lib/utils";
import { BackendUrl } from "@/utils/env";
import { ChatData } from "@/utils/types";
import { useAppKitAccount } from "@reown/appkit/react";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import { toast } from "sonner";
import EmojiPicker, { Theme, type EmojiClickData, } from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import backendApi from "@/utils/backendApi";

interface ChatProps {
    chats: ChatData[]
    loading: boolean
}
export default function Chat({ chats, loading }: ChatProps) {
    const { address, isConnected } = useAppKitAccount()
    const { handleSignMsg } = useWalletAuth()

    const [content, setContent] = useState('')
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);
    const onEmojiClick = (emojiObject: EmojiClickData) => {
        setContent((prev) => prev + emojiObject.emoji);
    };

    const sendChatMessage = async () => {
        if (!address) {
            toast.error('Wallet not Connected');
            return;
        };
        if (!content.trim()) {
            toast.error('Message cannot be empty');
            return;
        }
        const authTokenString = Cookies.get('authToken');
        if (!authTokenString) {
            // toast.error('Signature unverified!');
            handleSignMsg()
            return;
        };
        try {

            // Parse the JSON string
            // const authTokenData = JSON.parse(authTokenString);
            // // Extract the actual token (adjust the property name based on your backend response)
            // const token = authTokenData.token || authTokenData.accessToken || authTokenData;
            // console.log('Token to send:', token);
            // const res = await fetch(`${BackendUrl}/api/v1/chat`, {
            //     method: 'POST',
            //     credentials: "include",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${token}`
            //     },
            //     body: JSON.stringify({
            //         content,
            //         address
            //     })
            // })
            const res = await backendApi.sendChat(content, address)
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node)
            ) {
                setShowPicker(false);
            }
        }

        if (showPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPicker]);

    return (
        <div className="p-4 relative border-r border-dashed border-gray-30 h-[calc(100vh-60px)] md:h-[calc(100vh-135px)]">
            {chats.length === 0 ?
                <div className="h-full space-y-4 pb-12 flex items-center justify-center">
                    <H2 className="text-gray-70 text-center">No Chats Yet.</H2>
                </div>
                :
                <div className="h-full overflow-y-auto scrollbar-hide space-y-4 pb-12">
                    {
                        chats.map((chat, i) => {
                            return (
                                <div key={i} className="space-y-2 w-full relative">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-5 w-5 rounded-full bg-dark-blue"></div>
                                            <P12 className="text-gray-70 font-bold">{shortenAddress(chat.sender)}</P12>
                                        </div>
                                        <P12 className="text-gray-70 font-medium">{dayjs.unix(chat.ts).format("HH:mm A")}</P12>
                                    </div>
                                    <P16 className="text-neutral-10 px-2 leading-6">{chat.content}</P16>
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
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    sendChatMessage();
                                }
                            }}
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPicker(prev => !prev);
                            }}
                            className="bg-transparent text-gray-70 border-0 px-0"
                        >
                            <BsEmojiSmile />
                        </Button>
                        <Button size="sm" onClick={() => sendChatMessage()}>
                            <IoSendOutline />
                        </Button>
                        {showPicker && (
                            <div ref={pickerRef} className="absolute bottom-12 right-0 z-50 shadow-lg">
                                <EmojiPicker onEmojiClick={onEmojiClick} autoFocusSearch={false} theme={"dark" as Theme} height={400} width={260} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}