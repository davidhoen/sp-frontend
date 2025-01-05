"use server";

import { getCompetencyRating } from "@/lib";
import { CompetencyType, EndorsementRequestType, EndorsementType, GroupType, ProfileType, RequestsCountType, SkillType, SkillWithGroups, UserWithSkillsAndGroups } from "@/types";
import { getData } from "./data-fetching";

async function fetchData<T>(route: string, parseMethod?: (data: T, status?: number) => T | Promise<T>): Promise<T | undefined> {
    try {
        const { result, status } = await getData<T>(route);
        if (!result) return undefined;
        return parseMethod ? await parseMethod(result, status) : result;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getStudentSkill = async (id: string) =>
    fetchData<SkillType>(`/api/student/skills/${id}?with=ratings`);

export const getTeacherSkill = async (id: string) =>
    fetchData<SkillWithGroups>(`/api/educator/skills/${id}?with=groups`);

export const getSkillOfStudent = async ({ studentId, skillId }: { studentId: string, skillId: string }) =>
    fetchData<SkillWithGroups>(`/api/educator/students/${studentId}/${skillId}?with=groups`);

export const getEndorsementRequestResponse = async (id: string) =>
    fetchData<EndorsementRequestType | "expired">(
        `/api/endorsements/request/${id}`,
        (endorsementRequest, status) => status === 410 ? "expired" : endorsementRequest
    );

export const getCompetency = async (id: string) =>
    fetchData<CompetencyType>(`/api/student/competencies/${id}`);

export const getStudentCompetencies = async () =>
    fetchData<CompetencyType[]>(`/api/student/competencies?with=skills,endorsements`);

export const getGroup = async (id: string) =>
    fetchData<GroupType>(`/api/groups/${id}?with=skills,endorsements`);

export const getTeacherGroups = async () =>
    fetchData<GroupType[]>(`/api/educator/groups?is_joined=true&with=skills,students`);

export const getEnrolledGroups = async () =>
    fetchData<GroupType[]>(`/api/student/groups?with=teachers,skills,students`);

export const getStudentProfiles = async () =>
    fetchData<ProfileType[]>(`/api/student/profiles`);

export const getRecentEndorsements = async () =>
    fetchData<EndorsementType[]>(`/api/student/endorsements/recent?with=skill`);

export const getProfile = async (id: string) =>
    fetchData<ProfileType>(`/api/student/profiles/${id}`);

export const getProfileCompetencies = async (id: string) =>
    fetchData<CompetencyType[]>(
        `/api/competencies?with=skills.endorsements,profiles&profile=${id}`,
        (competencies) => {
            if (!competencies.length) return [];

            return competencies
                .map(competency => ({
                    ...competency,
                    avgRating: getCompetencyRating(competency)
                }))
                .sort((a, b) => b.avgRating - a.avgRating);
        }
    );

export const getStudent = async (id: string) =>
    fetchData<UserWithSkillsAndGroups>(`/api/educator/students/${id}?with=groups,feedbacks,endorsements`);

export const getTeacherRequestsCount = async () =>
    fetchData<RequestsCountType>(`/api/educator/requests/count`);