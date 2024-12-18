import { ProfileType } from "@/types";
import SunburstChartWrapper from './SunburstChartWrapper'

export default function ProfileChart({ profile }: { profile: ProfileType }) {
    // Mock data representing the Director skills diagram
    const directorSkillsData = {
        name: profile.title,
        children: [
            {
                name: "Administration",
                children: [
                    { name: "Storytelling", value: 20 },
                    { name: "Creativity", value: 15 }
                ]
            },
            {
                name: "Design",
                children: [
                    { name: "Writing a vision", value: 25 },
                    { name: "Planning", value: 20 }
                ]
            },
            {
                name: "Research",
                children: [
                    { name: "Interviewing", value: 20 },
                    { name: "Data Analysis", value: 15 }
                ]
            },
            {
                name: "Professionalization",
                children: [
                    { name: "Giving and receiving feedback", value: 25 },
                    { name: "Coaching", value: 20 }
                ]
            },
            {
                name: "Realization",
                children: [
                    { name: "Communication", value: 20 },
                    { name: "Collaboration", value: 15 },
                    { name: "Presenting", value: 20 }
                ]
            }
        ]
    }
    return <SunburstChartWrapper
        data={directorSkillsData}
        width={300}
        height={300}
    />
}
