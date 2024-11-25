import { CompetencyType, GroupType, SkillType } from "@/types"
import axios from "./axios"
import { PagingSchema } from "@/types/pagination";

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
        // Add page params and availableCompentencies to get the competencies connected to the skills
        const route = `/api/student/skills/?availableCompentencies=true&page=${page}&search=${search}&competencies=${competencies}&is_added=${isAdded}`
        const { data } = await axios.get<PagingSchema<SkillType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getCompetencies = async ({ page, search }: { page: number; search: string; }) => {
    try {
        const route = `/api/student/competencies?page=${page}&search=${search}`
        const { data } = await axios.get<PagingSchema<CompetencyType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getCompetency = async (id: number) => {
    try {
        const { data } = await axios.get<CompetencyType>(`/api/student/competencies/${id}`);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getGroups = async ({ page, search, isJoined }: { page: number; search: string; isJoined: string }) => {
    try {
        const route = `/api/student/groups?page=${page}&search=${search}&is_joined=${isJoined}`
        const { data } = await axios.get<PagingSchema<GroupType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getGroup = async (id: number) => {
    try {
        const { data } = await axios.get<GroupType>(`/api/student/groups/${id}`);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}
