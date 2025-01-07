import axiosInstance from "@/lib/axios"
import { RequestsCountType } from "@/types"
import useSWR from "swr"

export const useTeacherRequestsCount = () => {
    const url = `/api/educator/requests/count`
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: RequestsCountType }) => {
                return res.data
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}