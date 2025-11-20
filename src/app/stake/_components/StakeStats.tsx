'use client'
import { P12, P16 } from "@/components/typography";
import Image from "next/image";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function StakeStats() {
    // const { walletProvider } = useAppKitProvider<Provider>("eip155");
    // const { isConnected } = useAppKitAccount();
    // const { readContract } = useContract();

    // const viewAllStakedAmount = async () => {
    //     try {
    //         if (!walletProvider) return;
    //         const amount = await readContract.allOverStakeAmount();
    //         const formatted = ethers.formatEther(amount); // Format the amount (assuming it's in wei/18 decimals)

    //         console.log("Total Staked (raw):", amount.toString());
    //         console.log("Total Staked (formatted):", formatted);
    //     } catch (err) {
    //         console.log("view error", err);
    //     }
    // };
    // const viewUserStakedAmount = async () => {
    //     try {
    //         if (!walletProvider) return;
    //         const amount = await readContract.amountStaked(0, '0xC0694730eDc420a746bB1e6fCD7564cF5bAc3Fa6');
    //         const formatted = ethers.formatEther(amount); // Format the amount (assuming it's in wei/18 decimals)

    //         console.log("Total user Staked (raw):", amount.toString());
    //         console.log("Total user Staked (formatted):", formatted);
    //     } catch (err) {
    //         console.log("view error", err);
    //     }
    // };
    // useEffect(() => {
    //     viewAllStakedAmount();
    //     viewUserStakedAmount();
    // }, [isConnected, walletProvider]);

    return (
        <div className="bg-gray-30 p-3.25 rounded-md space-y-2.5 backdrop-blur-[6px]">
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">Total Staked <AiOutlineQuestionCircle size={14} /></P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/logo-icon.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">{(342323.6).toLocaleString()}</P16>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">Your Stakes <AiOutlineQuestionCircle size={14} /></P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/logo-icon.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">{(83.3).toLocaleString()}</P16>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">Total Yield <AiOutlineQuestionCircle size={14} /></P12>
                <div className="flex items-center gap-2 justify-center">
                    <Image src="/media/token.svg" alt="logo" height={16} width={16} className="rounded-full" />
                    <P16 className="font-bold">{(83.3).toLocaleString()}</P16>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">APR <AiOutlineQuestionCircle size={14} /></P12>
                <P16 className="font-bold">7.16% APY</P16>
            </div>
            <div className="flex items-center justify-between">
                <P12 className="text-gray-70 flex items-center gap-2">TVL <AiOutlineQuestionCircle size={14} /></P12>
                <P16 className="font-bold">${(342423423).toLocaleString()}</P16>
            </div>
        </div>
    )
}