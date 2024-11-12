import { SkillType } from "@/types"
import axios from "./axios"
import { PagingSchema } from "@/zod/Pagination";

export const getSkill = async (id: number) => {
    try {
        const { data } = await axios.get<SkillType>(`/api/student/skills/${id}`);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getSkills = async ({ page, search, competencies, isAdded }: { page: number; search: string; competencies: string; isAdded: string; }) => {
    try {
        const skillsRoute = `/api/student/skills/?availableCompentencies=true&page=${page}&search=${search}&competencies=${competencies}&is_added=${isAdded}`
        const { data } = await axios.get<PagingSchema<SkillType>>(skillsRoute);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}