import axiosInstance from "@/lib/axios"
import { SkillType } from "@/types"
import useSWR from "swr"

export const useGroupSkills = (id?: string) => {
    // Crazy number of skills to prevent pagination in dropdowns
    const url = id ? `/api/student/groups/${id}/skills?per_page=500` : ``
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: { data: SkillType[] } }) => {
                return res.data.data.map((skill) => ({
                    label: skill.title,
                    value: skill.id
                }))
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}