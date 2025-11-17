import BorderEdges from "@/components/BorderEdges";
import { H1, P12, P14, P16 } from "@/components/typography";
import Image from "next/image";
import MiningTable from "./MiningTable";
import PowerhouseTable from "./PowerhouseTable";
import BuybackTable from "./BuybackTable";
import GridStats from "./GridStats";

export default function Body() {
    return (
        <>
            <div className="bg-no-repeat bg-center" style={{ backgroundImage: 'url("/media/Lines.svg")' }}>
                <GridStats />

                <MiningTable />

                <PowerhouseTable />

                <BuybackTable />
            </div>
        </>
    )
}