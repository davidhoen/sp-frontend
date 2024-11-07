import axios from "@/lib/axios"
import { EventType } from "@/types"
import useSWR from "swr"

export const useEvents = () => {
    return useSWR("/api/events", () =>
        axios.get("/api/events")
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