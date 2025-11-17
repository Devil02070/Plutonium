import BorderEdges from "@/components/BorderEdges";
import { H1, P12, P14, P16 } from "@/components/typography";
import Image from "next/image";

export default function GridStats(){
    return(
        <section className="space-y-8 w-full max-w-6xl mx-auto px-4">
                <header className="space-y-1.5">
                    <H1 className="font-bold">Explore</H1>
                    <P14 className="text-gray-60">Review protocol stats and activity</P14>
                </header>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-2xl mx-auto text-center border-[1.5px] border-gray-40 p-2">
                    <BorderEdges cornerColor="#6E54FF" cornerThickness={2}>
                        <div className="p-2 space-y-2.5 text-center">
                            <P12 className="text-gray-70 font-medium">Max Supply</P12>
                            <div className="flex items-center gap-2 justify-center">
                                <Image src="/media/Vector.svg" alt="logo" height={20} width={20} className="rounded-full" />
                                <P16 className="font-bold">80.34</P16>
                            </div>
                        </div>
                    </BorderEdges>
                    <BorderEdges cornerColor="#6E54FF" cornerThickness={2}>
                        <div className="p-2 space-y-2.5 text-center">
                            <P12 className="text-gray-70 font-medium">Circulating Supply</P12>
                            <div className="flex items-center gap-2 justify-center">
                                <Image src="/media/Vector.svg" alt="logo" height={20} width={20} className="rounded-full" />
                                <P16 className="font-bold">80.34</P16>
                            </div>
                        </div>
                    </BorderEdges>
                    <div className="p-2 space-y-2.5 text-center">
                        <P12 className="text-gray-70 font-medium">Buried (7d)</P12>
                        <div className="flex items-center gap-2 justify-center">
                            <Image src="/media/Vector.svg" alt="logo" height={20} width={20} className="rounded-full" />
                            <P16 className="font-bold">80.34</P16>
                        </div>
                    </div>
                    <div className="p-2 space-y-2.5 text-center">
                        <P12 className="text-gray-70 font-medium">Protocol Rev (7d)</P12>
                        <div className="flex items-center gap-2 justify-center">
                            <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                            <P16 className="font-bold">80.34</P16>
                        </div>
                    </div>
                </div>
            </section>
    )
}