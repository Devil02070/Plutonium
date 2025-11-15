'use client'

import { useState } from "react"
import { BsChatDots } from "react-icons/bs"
import { MdKeyboardDoubleArrowLeft } from "react-icons/md"
import Chat from "./_components/Chat"
import Grid from "./_components/Grid"
import Winners from "./_components/Winners"

export default function Explore() {
    const [isChatSidebar, setIsChatSidebar] = useState(false)
    return (
        // <div className="grid grid-cols-4 gap-15 pe-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-15 pe-4 mt-6 px-4">
            <div className="col-span-1 md:h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide">
                {/* <Chat /> */}

                {/* desktop chat */}
                <div className="col-span-1 h-[calc(100vh-150px)] hidden lg:block">
                    <Chat />
                </div>

                {/* modile Chat */}
                <div className="col-span-1 lg:hidden">
                    <div className={`fixed top-20 border border-gray-40 p-2 left-0 z-90 rounded-md ${isChatSidebar ? 'bg-primary text-background' : 'bg-background'}`} onClick={() => setIsChatSidebar(!isChatSidebar)}>
                        <BsChatDots size={24} />
                    </div>
                    <div className={`bg-background border-r border-dashed border-gray-40 z-50 max-w-[80%] fixed left-0 top-0 md:h-[calc(100vh-100px)] transitoin-all duration-500 ${isChatSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                        <Chat />
                    </div>
                </div>
            </div>
            <div className="col-span-2 md:h-[calc(100vh-100px)] pb-4 overflow-y-auto scrollbar-hide">
                <Grid />
            </div>
            <div className="col-span-1 md:h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide">
                <Winners />
            </div>
        </div>
        // <div className="grid grid-cols-4 gap-15 pe-4 mt-6">
        //     <div className="col-span-1  h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide">
        //         {/* <Chat /> */}
        //         {/* desktop chat */}
        //         <div className="col-span-1 h-[calc(100vh-150px)] hidden lg:block">
        //             <Chat />
        //         </div>

        //         {/* modile Chat */}
        //         <div className="col-span-1 lg:hidden">
        //             <div className={`fixed top-20 border border-border-light p-2 left-2 z-90 rounded-md ${isChatSidebar ? 'bg-primary text-background' : 'bg-background'}`} onClick={() => setIsChatSidebar(!isChatSidebar)}>
        //                 <BsChatDots size={24} />
        //             </div>
        //             <div className={`bg-neutral-90 rounded-r-xl border-r border-border-light z-50 max-w-[80%] fixed left-0 md:h-[calc(100vh-150px)] transitoin-all duration-500 ${isChatSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        //                 <Chat />
        //             </div>
        //         </div>
        //     </div>
        //     <div className="col-span-2 h-[calc(100vh-100px)] pb-4 overflow-y-auto scrollbar-hide">
        //         <Grid />
        //     </div>
        //     <div className="col-span-1 h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide">
        //         <Winners />
        //     </div>
        // </div>
    )
}