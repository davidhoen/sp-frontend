"use server";

import { getCompetencyRating } from "@/lib";
import { CompetencyType, EndorsementRequestType, EndorsementType, GroupType, ProfileType, SkillType, SkillWithGroups, UserWithSkillsAndGroups } from "@/types";
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

export const getStudentSkill = async (id: number) =>
    fetchData<SkillType>(`/api/student/skills/${id}`);

export const getTeacherSkill = async (id: number) =>
    fetchData<SkillWithGroups>(`/api/teacher/skills/${id}?with=groups`);

export const getEndorsementRequestResponse = async (id: number) =>
    fetchData<EndorsementRequestType | "expired">(
        `/api/endorsements/request/${id}`,
        (endorsementRequest, status) => status === 410 ? "expired" : endorsementRequest
    );

export const getCompetency = async (id: number) =>
    fetchData<CompetencyType>(`/api/student/competencies/${id}`);

export const getStudentCompetencies = async () =>
    fetchData<CompetencyType[]>(`/api/student/competencies?with=skills,skills.endorsements`);

export const getGroup = async (id: number) =>
    fetchData<GroupType>(`/api/groups/${id}?with=skills,skills.endorsements`);

export const getEnrolledGroups = async () =>
    fetchData<GroupType[]>(`/api/student/groups?with=teachers,skills,students`);

export const getStudentProfiles = async () =>
    fetchData<ProfileType[]>(`/api/student/profiles`);

export const getRecentEndorsements = async () =>
    fetchData<EndorsementType[]>(`/api/student/endorsements/recent?with=skill`);

export const getProfile = async (id: number) =>
    fetchData<ProfileType>(`/api/student/profiles/${id}`);

export const getProfileCompetencies = async (id: number) =>
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

export const getStudent = async (id: number) =>
    fetchData<UserWithSkillsAndGroups>(`/api/teacher/students/${id}?with=groups`);