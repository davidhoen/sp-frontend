import { getFullName } from "@/lib"
import axiosInstance from "@/lib/axios"
import { UserType } from "@/types/auth"
import useSWR from "swr"

export const useTeachers = () => {
    // Crazy number of teachers to prevent pagination in dropdowns
    const url = `/api/teachers?per_page=500`
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: { data: UserType[] } }) => {
                return res.data.data.map((teacher) => ({
                    label: getFullName(teacher),
                    value: teacher.id
                }))
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}