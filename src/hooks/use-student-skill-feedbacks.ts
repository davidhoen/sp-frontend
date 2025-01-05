import axiosInstance from "@/lib/axios"
import { FeedbackType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"

export const useStudentSkillFeedbacks = (studentId: string, skillId: string) => {
    const searchParams = useSearchParams()
    const page = searchParams.get('skillFeedbacksPage') || 1
    const url = `/api/educator/students/${studentId}/skills/${skillId}/feedbacks?page=${page}&per_page=4`
    return useSWR(url, () =>
        axiosInstance.get<PagingSchema<FeedbackType>>(url)
            .then((res) => {
                return res.data
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    ) as { data: PagingSchema<FeedbackType> | undefined, isLoading: boolean }
}