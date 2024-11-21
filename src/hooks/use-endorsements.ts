import axios from "@/lib/axios"
import useSWR from "swr"
import { EndorsementType } from "@/types"

export const useEndorsements = (skillId: string) => {
    const url = `/api/skills/${skillId}/endorsements`
    return useSWR(url, () =>
        axios.get(url)
            .then((res: { data: EndorsementType[] }) => {
                return res.data
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}