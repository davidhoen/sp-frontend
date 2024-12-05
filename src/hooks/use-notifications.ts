import axiosInstance from "@/lib/axios"
import { CompetencyType, NotificationType } from "@/types"
import useSWR from "swr"

export const useNotifications = () => {
    const url = "/api/notifications"
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: NotificationType[] }) => {
                if (res.data.length === 0) return []
                return res.data
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}