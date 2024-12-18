import axiosInstance from "@/lib/axios"
import { SkillType } from "@/types"
import useSWR from "swr"

export const useSkills = (id?: string) => {
    const url = id ? `/api/teacher/skills` : ``
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