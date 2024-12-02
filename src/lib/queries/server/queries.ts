"use server"

import { CompetencyType, EndorsementRequestType, GroupType, SkillType } from "@/types";
import { getData } from "./data-fetching";

// For now only the detail pages are server side rendered

export const getSkill = async (id: number) => {
    try {
        const { result } = await getData<SkillType>(`/api/student/skills/${id}`);
        return result
    }
    catch (error) {
        console.error(error);
    }
}

export const getEndorsementRequestResponse = async (id: number) => {
    try {
        const { result, status } = await getData<EndorsementRequestType>(`/api/endorsement_request/${id}`);
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
        const { result } = await getData<CompetencyType>(`/api/competencies/${id}`);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

export const getGroup = async (id: number) => {
    try {
        const { result } = await getData<GroupType>(`/api/student/groups/${id}`);
        return result;
    }
    catch (error) {
        console.error(error);
    }
}
