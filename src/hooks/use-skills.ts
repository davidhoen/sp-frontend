import axiosInstance from "@/lib/axios"
import { SkillType } from "@/types"
import useSWR from "swr"

export const useSkills = () => {
    // Crazy number of skills to prevent pagination in dropdowns
    const url = `/api/teacher/skills?per_page=500`
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