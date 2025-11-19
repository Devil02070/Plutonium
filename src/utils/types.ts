export interface ChatData {
    id: number,
    sender: string,
    content: string,
    ts:number,
    user: {
        name: string | null,
        image: string | null
    }
}

export interface EventData {
    block: number,
    users: string[],
    amounts: number[],
    plt: number[],
    one_plt_winner?: string,
    powerhouse: number[],
    one_plt_winner_amt: number,
}

export interface MiningData {
    id: number,
    win_idx: number,
    winners_count: number,
    is_plt_split: boolean,
    plt_winner_addr: string | null,
    deposit: number,
    vaulted: number,
    winnings: number,
    powerhouse: number,
    ts: number
}
