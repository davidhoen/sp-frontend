import { CompetencyType, EndorsementRequestType, EndorsementType, FeedbackType, GroupType, NotificationType, NotificationTypeEnum, RatingHistoryType, SkillType } from "@/types"
import { UserType } from "@/types/auth"
import { v4 as uuid } from "uuid"

export const fakeStudent: UserType = {
    id: uuid(),
    email: "user@skillspassport.nl",
    first_name: "John",
    last_name: "Doe",
    is_teacher: false,
    is_head_teacher: false,
    is_admin: false,
    role: {
        id: uuid(),
        name: "Student",
    },
    role_id: uuid(),
    image: "https://xsgames.co/randomusers/avatar.php?g=male",
}

export const fakeStudent2: UserType = {
    id: uuid(),
    email: "user2@skillspassport.nl",
    first_name: "Gea",
    last_name: "van Booven",
    role: {
        id: uuid(),
        name: "Student",
    },
    role_id: uuid(),
    is_teacher: false,
    is_head_teacher: false,
    is_admin: false,
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
    },
    role_id: uuid(),
    is_teacher: false,
    is_head_teacher: false,
    is_admin: false,
    image: "https://xsgames.co/randomusers/avatar.php?g=female",
}

export const feedback: FeedbackType = {
    id: uuid(),
    user: fakeStudent,
    created_at: new Date(),
    title: "Start presentation",
    content: "Improvement could be incorporating more real-world examples to illustrate the points. Nevertheless, it was a compelling presentation."
}



export const ratingUpdate: RatingHistoryType = {
    rating: 3,
    created_at: new Date()
}

export const fakeCompetency: CompetencyType = {
    id: uuid(),
    title: "Communication",
    desc: "You have a good understanding of the subject matter and can apply it in real-world scenarios",
    overview: "You have a good understanding of the subject matter and can apply it in real-world scenarios. You have a good understanding of the subject matter and can apply it in real-world scenarios.You have a good understanding of the subject matter and can apply it in real-world scenarios. ",
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
    ratings: [{
        rating: 1,
        created_at: new Date()
    },
    {
        rating: 2,
        created_at: new Date()
    },
    {
        rating: 3,
        created_at: new Date()
    }],
    created_at: new Date(),
    groups_count: 0,
    is_added: false,
}

export const endorsement: EndorsementType = {
    id: uuid(),
    user: fakeTeacher,
    title: "Midterm evaluation",
    content: "Impressive command over the subject matter and ability to engage the audience",
    rating: 3,
    is_approved: true,
    skill: fakeSkill,
    created_by: fakeStudent,
    created_at: new Date()
}

export const fakeGroup: GroupType = {
    id: uuid(),
    name: "Conversations in organizations (24/25)",
    desc: "Learning conversation skills isnt done through reading; the goal is for students to gain practical experience.",
    created_by: fakeTeacher,
    created_at: new Date(),
    teachers: [fakeTeacher, fakeTeacher],
    students: [fakeStudent, fakeStudent2],
    skills: [fakeSkill, fakeSkill2],
}

export const fakeEndorsementRequest: EndorsementRequestType = {
    id: uuid(),
    title: "Starting presentation",
    requester: fakeStudent,
    skill: fakeSkill
}

export const fakeNotifications: NotificationType[] = [
    {
        id: uuid(),
        type: NotificationTypeEnum.FeedbackRequest,
        requestee_name: "John Doe",
        skill: {
            id: uuid(),
            title: "Skill 1"
        }
    },
    {
        id: uuid(),
        type: NotificationTypeEnum.FeedbackReceived,
        requestee_name: "Jane Doe",
        skill: {
            id: uuid(),
            title: "Skill 2"
        }
    },
    {
        id: uuid(),
        type: NotificationTypeEnum.EndorsementReceived,
        requestee_name: "John Doe",
        skill: {
            id: uuid(),
            title: "Skill 3"
        }
    },
    {
        id: uuid(),
        type: NotificationTypeEnum.EndorsementReviewed,
        requestee_name: "Jane Doe",
        skill: {
            id: uuid(),
            title: "Skill 4"
        }
    }
]