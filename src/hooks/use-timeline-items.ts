import axiosInstance from "@/lib/axios"
import { TimeLineItemType } from "@/types"
import useSWR from "swr"

export const useTimeLineItems = (skillId: string) => {
    const url = `/api/skills/${skillId}/timeline`
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: TimeLineItemType[] }) => {
                return res.data.data
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}