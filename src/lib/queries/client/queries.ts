import axiosInstance from "@/lib/axios";
import { CompetencyType, GroupType, ProfileWithCompetencies, RequestType, SkillType, UserWithSkills, UserWithSkillsAndGroups } from "@/types";
import { PagingSchema } from "@/types/pagination";

type QueryParams = Record<string, string | number | boolean>;

async function queryAPI<T>(route: string, params: QueryParams = {}) {
    try {
        const queryString = new URLSearchParams(
            Object.entries(params).map(([key, value]) => [key, String(value)])
        ).toString();

        const url = `${route}${queryString ? '?' + queryString : ''}`;
        const { data } = await axiosInstance.get<PagingSchema<T>>(url);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSkills = ({ query }: { query: Record<string, string> }) =>
    queryAPI<SkillType>('/api/student/skills', {
        ...query,
        availableCompentencies: true,
    });

export const getTeacherSkills = ({ query }: { query: Record<string, string> }) =>
    queryAPI<SkillType>('/api/teacher/skills', { with: 'competency', ...query });

export const getCompetencies = ({ query }: { query: Record<string, string> }) =>
    queryAPI<CompetencyType>('/api/competencies', { with: 'skills,profiles', ...query });

export const getTeacherProfiles = ({ query }: { query: Record<string, string> }) =>
    queryAPI<ProfileWithCompetencies>('/api/teacher/profiles', { with: 'competencies', ...query });

export const getGroups = ({ query }: { query: Record<string, string> }) =>
    queryAPI<GroupType>('/api/groups', { with: 'teachers,students,skills', ...query });

export const getStudentRequests = (params: { page: number; search: string }) =>
    queryAPI<RequestType>('/api/student/requests', { with: 'requester,skill,group', ...params });

export const getGroupStudents = ({ groupId, query }: { groupId: string, query: Record<string, string> }) =>
    queryAPI<UserWithSkills>(`/api/teacher/groups/${groupId}/students`, { with: 'skills', ...query });

export const getStudents = ({ query }: { query: Record<string, string> }) =>
    queryAPI<UserWithSkillsAndGroups>('/api/teacher/students', { with: 'skills,groups', ...query });

export const getFeedbackRequests = ({ query }: { query: Record<string, string> }) =>
    queryAPI<RequestType>('/api/teacher/requests/feedbacks', { with: 'requester,skill,group', ...query });

export const getEndorsementRequests = ({ query }: { query: Record<string, string> }) =>
    queryAPI<RequestType>('/api/teacher/requests/endorsements', { with: 'requester,skill,group', ...query });