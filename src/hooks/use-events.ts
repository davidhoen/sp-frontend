import axios from "@/lib/axios"
import useSWR from "swr"

export const useEvents = () => {
    const url = "/api/events"
    return useSWR(url, () =>
        axios.get(url)
            .then((res: { data: any[] }) => {
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