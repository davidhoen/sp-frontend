import axiosInstance from "@/lib/axios"
import { ProfileType } from "@/types"
import useSWR from "swr"

export const useProfiles = () => {
    const url = `/api/educator/profiles`
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: { data: ProfileType[] } }) => {
                return res.data.data.map((profile) => ({
                    label: profile.title,
                    value: profile.id
                }))
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}