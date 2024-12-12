import axiosInstance from "@/lib/axios"
import useSWR from "swr"

export const useGroupSkills = (id?: string) => {
    const url = id ? `/api/student/groups/${id}/skills` : ``
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: any[] }) => {
                return res.data.map((group) => ({
                    label: group.title,
                    value: group.id
                }))
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}