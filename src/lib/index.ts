import { CompetencyType, GroupType, TranslationFunction } from "@/types"
import { UserType } from "@/types/auth"
import toast from "react-hot-toast"
import baseX from 'base-x'

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

// Using base58 alphabet (similar to what Bitcoin uses - no similar-looking characters)
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58 = baseX(BASE58_ALPHABET);

export function uuidToShortString(uuid: string): string {
    // Remove hyphens from UUID
    const cleanUuid = uuid.replace(/-/g, '');

    // Convert hex string to Uint8Array
    const bytes = new Uint8Array(16);
    for (let i = 0; i < 32; i += 2) {
        bytes[i / 2] = parseInt(cleanUuid.slice(i, i + 2), 16);
    }

    // Encode to base58
    return base58.encode(bytes);
}

export function shortStringToUuid(shortStr: string): string {
    try {
        // Decode from base58 back to bytes
        const bytes = base58.decode(shortStr);

        // Convert bytes to hex string
        const hex = Array.from(bytes)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('')
            .padStart(32, '0');

        // Insert hyphens to create UUID format
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    } catch (error) {
        throw new Error('Invalid short string format');
    }
}
