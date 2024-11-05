import { UserType } from "@/types/User"

// Create a full name of the user
export const getFullName = (user: UserType) => {
    return `${user.first_name} ${user.last_name}`
}