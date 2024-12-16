import axiosInstance from "@/lib/axios";
import { CompetencyType, EndorsementRequestType, GroupType, ProfileType, SkillType } from "@/types";
import { PagingSchema } from "@/types/pagination";

export const getSkills = async ({ page, search, competencies, isAdded }: { page: number; search: string; competencies: string; isAdded: string; }) => {
    try {
        // Add page params and availableCompentencies to get the competencies connected to the skills
        const route = `/api/student/skills/?availableCompentencies=true&page=${page}&search=${search}&competencies=${competencies}&is_added=${isAdded}`
        const { data } = await axiosInstance.get<PagingSchema<SkillType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getCompetencies = async ({ page, search }: { page: number; search: string; }) => {
    try {
        const route = `/api/competencies?page=${page}&search=${search}`
        const { data } = await axiosInstance.get<PagingSchema<CompetencyType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getGroups = async ({ page, search, isJoined }: { page: number; search: string; isJoined: string }) => {
    try {
        const route = `/api/groups?page=${page}&search=${search}&is_joined=${isJoined}`
        const { data } = await axiosInstance.get<PagingSchema<GroupType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}