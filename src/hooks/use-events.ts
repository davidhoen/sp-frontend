import axios from "@/lib/axios"
import useSWR from "swr"
import { EventType } from "@/types"

export const useEvents = () => {
    const url = "/api/events"
    return useSWR(url, () =>
        axios.get(url)
            .then((res: { data: EventType[] }) => {
                return res.data.map((event) => ({
                    label: event.title,
                    value: event.id
                }))
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}