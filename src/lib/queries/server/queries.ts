"use server"

import { getCompetencyRating } from "@/lib";
import { CompetencyType, EndorsementRequestType, EndorsementType, GroupType, ProfileType, SkillType, SkillWithGroups, UserWithSkillsAndGroups } from "@/types";
import { getData } from "./data-fetching";

// Only the detail pages are rendered serverside 

export const getStudentSkill = async (id: number) => {
    try {
        const { result } = await getData<SkillType>(`/api/student/skills/${id}`);
        return result
    }
    catch (error) {
        console.error(error);
    }
}

export const getTeacherSkill = async (id: number) => {
    try {
        const { result } = await getData<SkillWithGroups>(`/api/teacher/skills/${id}?with=groups`);
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
        const route = `/api/student/groups?with=teachers,skills,students`
        const { result } = await getData<GroupType[]>(route);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const getStudentProfiles = async () => {
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

export const getProfile = async (id: number) => {
    try {
        const { result } = await getData<ProfileType>(`/api/student/profiles/${id}`);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const getProfileCompetencies = async (id: number) => {
    try {
        const { result } = await getData<CompetencyType[]>(`/api/competencies?with=skills.endorsements,profiles&profile=${id}`);

        if (!result) return [];

        // Get average rating for each competency
        const competenciesWithRating = result.map(competency => {
            const avgRating = getCompetencyRating(competency);
            return { ...competency, avgRating };
        });

        // Sort the competencies average rating of the connected skills
        return competenciesWithRating.sort((a, b) => b.avgRating - a.avgRating);
    }
    catch (error) {
        console.error(error);
    }
}

export const getStudent = async (id: number) => {
    try {
        const { result } = await getData<UserWithSkillsAndGroups>(`/api/teacher/students/${id}?with=groups`);
        return result
    }
    catch (error) {
        console.error(error);
    }
}