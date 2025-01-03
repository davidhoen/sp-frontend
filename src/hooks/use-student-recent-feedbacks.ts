import axiosInstance from "@/lib/axios"
import { FeedbackType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"

export const useStudentRecentFeedbacks = (studentId: string) => {
    const searchParams = useSearchParams()
    const page = searchParams.get('endorsementsPage') || 1
    const url = `/api/teacher/students/${studentId}/feedbacks/recent?with=skill,createdBy&page=${page}&per_page=4`
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