import axiosInstance from "@/lib/axios"
import useSWR from "swr"
import { EndorsementType } from "@/types"
import { useSearchParams } from "next/navigation"
import { PagingSchema } from "@/types/pagination"

export const useRecentEndorsements = (competencyId: string) => {
    const searchParams = useSearchParams()
    const page = searchParams.get('endorsementsPage') || 1
    const url = `/api/student/endorsements/recent?with=skill,createdBy&page=${page}&per_page=4&competency=${competencyId}`
    return useSWR(url, () =>
        axiosInstance.get<PagingSchema<EndorsementType>>(url)
            .then((res) => {
                return res.data
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    ) as { data: PagingSchema<EndorsementType> | undefined, isLoading: boolean }
}