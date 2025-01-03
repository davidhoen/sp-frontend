import { CompetencyType, GroupType, TranslationFunction } from "@/types"
import { UserType } from "@/types/auth"
import toast from "react-hot-toast"

// Create a full name of the user
export const getFullName = (user: UserType) => {
    return `${user?.first_name} ${user?.last_name}`
}

// User name or "you" when viewing on feedback 
export const getYouOrFullName = (entityUser: UserType, t: TranslationFunction, loggedInUser?: UserType) => {
    return (loggedInUser && loggedInUser.id === entityUser?.id) ? t("you") : getFullName(entityUser)
}

export const getStarTitles = (t: TranslationFunction) => {
    return [t("insufficient"), t("sufficient"), t("good"), t("excellent")]
}

// Trigger the toast component with generic or custom translations
export const triggerPromiseToast = <T extends any>(response: Promise<T>, t: TranslationFunction, messages?: { success?: string, error?: string, loading?: string }) => {
    return toast.promise(response, {
        loading: messages?.loading ?? t('loading'),
        success: messages?.success ?? t('successfullySaved'),
        error: messages?.error ?? t('genericError'),
    });
}

export const getCompetencyRating = (competency: CompetencyType) => {
    const ratings = competency.skills?.map((skill) => {
        const skillRating = skill.rating
        if (skillRating) return skillRating
        return undefined
    }).filter((rating): rating is number => rating !== undefined)

    // Get the average rating of the skills or return 0
    return ratings.length > 0 ? roundToQuarter(ratings?.reduce((acc, rating) => acc + (rating ?? 0), 0) / ratings?.length) : 0
}

export const roundToQuarter = (num: number) => {
    return Math.round(num * 4) / 4
}

export const roleBasePathMap: { [key: string]: string } = {
    student: "/student",
    teacher: "/teacher",
    head_teacher: "/teacher",
    admin: "/teacher",
};

export const isTeacherUser = (user: UserType) => {
    return user?.is_teacher || user?.is_head_teacher || user?.is_admin || false
}

export const isEnrolledToGroup = (group: GroupType, user?: UserType | null) => {
    return !!user && !!group.students?.some((student) => student.id === user.id)
}