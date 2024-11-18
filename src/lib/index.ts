import { RatingHistoryType, TranslationFunction } from "@/types"
import { UserType } from "@/types/User"

// Create a full name of the user
export const getFullName = (user: UserType) => {
    return `${user?.first_name} ${user?.last_name}`
}

// User name or "you" when viewing on feedback 
export const getYouOrFullName = (entityUser: UserType, t: TranslationFunction, loggedInUser?: UserType) => {
    return (loggedInUser && loggedInUser.id === entityUser.id) ? t("you") : getFullName(entityUser)
}

export const getStarTitles = (t: TranslationFunction) => {
    return [t("insufficient"), t("sufficient"), t("good"), t("excellent")]
}

export const getMostRecentRating = (ratings: RatingHistoryType[]) => {
    const rating = ratings.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())[0]
    return rating ? rating : undefined
}