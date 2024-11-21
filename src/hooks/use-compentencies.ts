import axios from "@/lib/axios"
import { CompetencyType } from "@/types"
import useSWR from "swr"

export const useCompentencies = () => {
    const url = "/api/student/competencies"
    return useSWR(url, () =>
        axios.get(url)
            .then((res: { data: { competencies: CompetencyType[] } }) => {
                if (res.data.competencies.length === 0) return []
                return res.data.competencies.map((competency) => ({
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