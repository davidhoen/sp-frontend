import axiosInstance from "@/lib/axios"
import { CompetencyType } from "@/types"
import useSWR from "swr"

export const useCompetencies = () => {
    // Crazy number of competencies to prevent pagination in dropdowns
    const url = "/api/competencies?per_page=500"
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: { data: CompetencyType[] } }) => {
                if (res.data?.data.length === 0) return []
                return res.data.data.map((competency) => ({
                    label: competency.title,
                    value: competency.id
                }))
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}