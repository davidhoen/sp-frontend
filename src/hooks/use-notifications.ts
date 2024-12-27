import axiosInstance from "@/lib/axios"
import { CompetencyType, NotificationType } from "@/types"
import useSWR from "swr"

export const useNotifications = () => {
    const url = "/api/notifications"
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: { data: NotificationType[] } }) => {
                if (res.data.data.length === 0) return []
                // Sort notifications read at, first the ones who are not read
                res.data.data.sort((a: NotificationType, b: NotificationType) => {
                    if (a.read_at && !b.read_at) return 1
                    if (!a.read_at && b.read_at) return -1
                    return 0
                })
                return res.data.data
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}