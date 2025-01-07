import axiosInstance from "@/lib/axios"
import { Role } from "@/types/auth"
import useSWR from "swr"

export const useRoles = () => {
    const url = `/api/roles`
    return useSWR(url, () =>
        axiosInstance.get(url)
            .then((res: { data: Role[] }) => {
                return res.data.map((role) => ({
                    label: role.name,
                    value: role.id
                }))
            })
            .catch((error) => {
                console.error(error)
                return []
            })
    )
}