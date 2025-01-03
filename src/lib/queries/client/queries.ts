import axiosInstance from "@/lib/axios";
import { CompetencyType, GroupType, ProfileType, ProfileWithCompetencies, SkillType, StudentRequestType, UserWithSkills } from "@/types";
import { UserType } from "@/types/auth";
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

export const getTeacherSkills = async ({ query }: { query: Record<string, string> }) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const route = `/api/teacher/skills?with=competency&${queryString}`
        const { data } = await axiosInstance.get<PagingSchema<SkillType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getCompetencies = async ({ query }: { query: Record<string, string> }) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const route = `/api/competencies?with=skills,profiles&${queryString}`
        const { data } = await axiosInstance.get<PagingSchema<CompetencyType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getTeacherProfiles = async ({ query }: { query: Record<string, string> }) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const route = `/api/teacher/profiles?with=competencies&${queryString}`
        const { data } = await axiosInstance.get<PagingSchema<ProfileWithCompetencies>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getGroups = async ({ query }: { query: Record<string, string> }) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const route = `/api/groups?with=teachers,students,skills,students&${queryString}`
        const { data } = await axiosInstance.get<PagingSchema<GroupType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getStudentRequests = async ({ page, search }: { page: number; search: string }) => {
    try {
        const route = `/api/student/requests?with=requester,skill,group&page=${page}&search=${search}`
        const { data } = await axiosInstance.get<PagingSchema<StudentRequestType>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getGroupStudents = async ({ groupId, query }: { groupId: string, query: Record<string, string> }) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const route = `/api/teacher/groups/${groupId}/students?with=skills&${queryString}`
        const { data } = await axiosInstance.get<PagingSchema<UserWithSkills>>(route);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}