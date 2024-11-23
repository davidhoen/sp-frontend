import axios from "@/lib/axios"
import { FeedbackType } from "@/types"
import useSWR from "swr"

export const useFeedbacks = (skillId: string) => {
    const url = `/api/skills/${skillId}/feedbacks`
    return useSWR(url, () =>
        axios.get(url)
            .then((res: { data: FeedbackType[] }) => {
                return res.data
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}