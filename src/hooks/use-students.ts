import { getFullName } from "@/lib"
import axiosInstance from "@/lib/axios"
import { UserType } from "@/types/auth"
import useSWR from "swr"

export const useStudents = () => {
    // Crazy number of students to prevent pagination in dropdowns
    const url = `/api/educator/students?per_page=500`
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: { data: UserType[] } }) => {
                return res.data.data.map((student) => ({
                    label: getFullName(student),
                    value: student.id
                }))
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}