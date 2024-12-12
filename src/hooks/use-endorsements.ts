import axiosInstance from "@/lib/axios"
import useSWR from "swr"
import { EndorsementType } from "@/types"

export const useEndorsements = (skillId: string) => {
    const url = `/api/skills/${skillId}/endorsements?with=createdBy`
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: EndorsementType[] }) => {
                return res.data
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}