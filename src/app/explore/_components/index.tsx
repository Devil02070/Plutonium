'use client'
import MiningTable from "./MiningTable";
import PowerhouseTable from "./PowerhouseTable";
import BuybackTable from "./BuybackTable";
import GridStats from "./GridStats";
import backendApi from "@/utils/backendApi";
import { useCallback, useEffect, useState } from "react";
import { MiningData } from "@/utils/types";

export default function Body() {
    const [mining, setMining] = useState<MiningData[]>([])
    const [powerhouse, setPowerhouse] = useState<MiningData[]>([])

    // const [totalPages, setTotalPages] = useState(0)
    // const [miningOffset, setMiningOffset] = useState(0)

    const getMiningData = useCallback(async () => {
        try {
            const res = await backendApi.getExploreMining();
            setMining(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getPowerhouseData = useCallback(async () => {
        try {
            const res = await backendApi.getExplorePowerhouse();
            setPowerhouse(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getMiningData();
        getPowerhouseData()
        const interval = setInterval(() => {
            getMiningData();
            getPowerhouseData();
        }, 30000)
        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <div className="bg-no-repeat bg-center" style={{ backgroundImage: 'url("/media/Lines.svg")' }}>
                <GridStats />

                <MiningTable mining={mining} />

                <PowerhouseTable powerhouse={powerhouse} />

                <BuybackTable />
            </div>
        </>
    )
}