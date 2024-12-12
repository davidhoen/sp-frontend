"use server"

import { CompetencyType, EndorsementRequestType, EndorsementType, GroupType, ProfileType, SkillType } from "@/types";
import { getData } from "./data-fetching";

// For now only the detail pages are server side rendered

export const getSkill = async (id: number) => {
    try {
        const { result } = await getData<SkillType>(`/api/student/skills/${id}?with=skill,createdBy`);
        return result
    }
    catch (error) {
        console.error(error);
    }
}

export const getEndorsementRequestResponse = async (id: number) => {
    try {
        const { result, status } = await getData<EndorsementRequestType>(`/api/endorsements/request/${id}`);
        if (status === 410)
            return "expired";
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const getCompetency = async (id: number) => {
    try {
        const { result } = await getData<CompetencyType>(`/api/student/competencies/${id}`);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const getStudentCompetencies = async () => {
    try {
        const { result } = await getData<CompetencyType[]>(`/api/student/competencies?with=skills,skills.endorsements`);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const getGroup = async (id: number) => {
    try {
        const { result } = await getData<GroupType>(`/api/groups/${id}?with=skills,skills.endorsements`);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const getEnrolledGroups = async () => {
    try {
        const route = `/api/student/groups?with=teachers,skills`
        const { result } = await getData<GroupType[]>(route);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const getProfiles = async () => {
    try {
        const route = `/api/student/profiles`
        const { result } = await getData<ProfileType[]>(route);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const getRecentEndorsements = async () => {
    try {
        const route = `/api/student/endorsements/recent?with=skill`;
        const { result } = await getData<EndorsementType[]>(route);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}