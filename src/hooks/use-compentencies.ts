import axios from "@/lib/axios"
import { CompetencyType } from "@/types"
import useSWR from "swr"

export const useCompentencies = () => {
    return useSWR("/api/competencies", () =>
        axios.get("/api/competencies")
            .then((res: { data: CompetencyType[] }) => {
                return res.data.map((competency) => ({
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