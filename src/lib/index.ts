import { CompetencyType, RatingHistoryType, TranslationFunction } from "@/types"
import { UserType } from "@/types/User"
import toast from "react-hot-toast"

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

// Trigger the toast component with generic or custom translations
export const triggerPromiseToast = <T extends any>(response: Promise<T>, t: TranslationFunction, messages?: { success?: string, error?: string }) => {
    return toast.promise(response, {
        loading: t('loading'),
        success: messages?.success ?? t('successfullySaved'),
        error: messages?.error ?? t('genericError'),
    });
}

export const getCompetencyRating = (competency: CompetencyType) => {
    const ratings = competency.skills.map((skill) => {
        const skillRating = getMostRecentRating(skill.ratings)?.rating
        if (skillRating) return skillRating
        return undefined
    }).filter((rating): rating is number => rating !== undefined)

    // Get the average rating of the skills
    return roundToQuarter(ratings.reduce((acc, rating) => acc + (rating ?? 0), 0) / ratings.length)
}

export const roundToQuarter = (num: number) => {
    return Math.round(num * 4) / 4
}

export const LOGIN_ROUTE = "/en/login";

// Expired session
export const EXPIRED_SESSION_PARAM = "expired_session";
export const EXPIRED_SESSION_ROUTE = `${LOGIN_ROUTE}?${EXPIRED_SESSION_PARAM}`;
