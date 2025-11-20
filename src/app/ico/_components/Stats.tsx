import { P12, P16 } from "@/components/typography";
import Image from "next/image";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function Stats() {
    return (
        <div className="bg-gray-30 p-3.25 rounded-md space-y-2.5 backdrop-blur-[6px]">
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">Max Supply <AiOutlineQuestionCircle size={14} /></P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/logo-icon.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">21M</P16>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">Sale Price <AiOutlineQuestionCircle size={14} /></P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/logo-icon.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">$0.01</P16>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">Circulating Supply <AiOutlineQuestionCircle size={14} /></P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/logo-icon.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">1M</P16>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">Token for Sale <AiOutlineQuestionCircle size={14} /></P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/logo-icon.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">500k</P16>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">Total Raise <AiOutlineQuestionCircle size={14} /></P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/logo-icon.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">$50k</P16>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">Sale Timing <AiOutlineQuestionCircle size={14} /></P12>
                <P16 className="font-bold">24 Nov - 26 Nov</P16>
            </div>
        </div>
    )
}