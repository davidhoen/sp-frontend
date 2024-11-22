import { CompetencyType, EndorsementRequest, EndorsementType, FeedbackType, RatingHistoryType, SkillType } from "@/types"
import { UserType } from "@/types/User"
import { v4 as uuid } from "uuid"

export const fakeStudent: UserType = {
    id: uuid(),
    email: "user@skillspassport.nl",
    first_name: "John",
    last_name: "Doe",
    role: {
        id: uuid(),
        name: "Student",
        is_teacher: false,
        is_head_teacher: false
    },
    role_id: uuid(),
    image: "https://xsgames.co/randomusers/avatar.php?g=male",
}

export const fakeTeacher: UserType = {
    id: uuid(),
    email: "teacher@skillspassport.nl",
    first_name: "Jane",
    last_name: "Robbertson",
    role: {
        id: uuid(),
        name: "Teacher",
        is_teacher: true,
        is_head_teacher: false
    },
    role_id: uuid(),
    image: "https://xsgames.co/randomusers/avatar.php?g=female",
}

export const feedback: FeedbackType = {
    id: uuid(),
    user: fakeStudent,
    created_at: new Date(),
    title: "Start presentation",
    content: "Improvement could be incorporating more real-world examples to illustrate the points. Nevertheless, it was a compelling presentation."
}

export const endorsement: EndorsementType = {
    id: uuid(),
    user: fakeTeacher,
    title: "Midterm evaluation",
    content: "Impressive command over the subject matter and ability to engage the audience",
    rating: 3,
    is_approved: true,
    created_by: fakeStudent,
    created_at: new Date()
}

export const ratingUpdate: RatingHistoryType = {
    rating: 3,
    created_at: new Date()
}

export const fakeCompetency: CompetencyType = {
    id: uuid(),
    title: "Communication",
    desc: "You have a good understanding of the subject matter and can apply it in real-world scenarios",
    overview: "Competency overview",
    skills: [],
    profiles: [],
    feedbacks_count: 4,
    endorsements_count: 3,
    created_at: new Date(),
}

export const fakeSkill: SkillType = {
    id: uuid(),
    title: "Presenting",
    desc: "React is a JavaScript library for building user interfaces",
    competency: fakeCompetency,
    ratings: [
        ratingUpdate,
        {
            rating: 4,
            created_at: new Date()
        }
    ],
    created_at: new Date(),
    groups_count: 0,
    is_added: false,
}

export const fakeSkill2: SkillType = {
    id: uuid(),
    title: "Creativity",
    desc: "React is a JavaScript library for building user interfaces",
    competency: fakeCompetency,
    ratings: [],
    created_at: new Date(),
    groups_count: 0,
    is_added: false,
}

export const fakeEndorsementRequest: EndorsementRequest = {
    id: uuid(),
    title: "Starting presentation",
    requester: fakeStudent,
    skill: fakeSkill
}