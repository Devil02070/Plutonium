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