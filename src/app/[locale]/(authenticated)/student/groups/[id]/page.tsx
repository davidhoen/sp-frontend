import SkillCard from "@/components/SkillCard"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import UserLine from "@/components/UserLine"
import { fakeGroup } from "@/lib/fakeData"
import { getGroup } from "@/lib/queries"
import { getTranslations } from "next-intl/server"

const GroupsDetail = async ({ params }: { params: { id: number } }) => {
    const t = await getTranslations("general")
    // TODO: Replace with const and remove fakeGroup
    let group = await getGroup(params.id)

    if (!group)
        group = fakeGroup

    if (!group)
        return t("noSkillFound")

    return <div className="flex flex-col gap-6">

        <div className="">
            {/* Title */}
            <PageTitle className="mb-4">{group.name}</PageTitle>

            {/* Description */}
            <p>{group.desc}</p>
        </div>

        {/* Teachers */}
        <div>
            <SectionTitle>{t("teachers")}</SectionTitle>
            <div className="flex flex-col gap-2">
                {group?.teachers.map((teacher) => <UserLine key={teacher.id} user={teacher} />)}
            </div>
        </div>

        {/* Skills */}
        <div>
            <SectionTitle>{t("skills")}</SectionTitle>
            <div className="grid gap-2 max-w-xs">
                {group?.skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
            </div>
        </div>

        {/* Students */}
        <div>
            <SectionTitle>{t("students")}</SectionTitle>
            <div className="flex flex-col gap-2">
                {group?.students.map((student) => <UserLine key={student.id} user={student} />)}
            </div>
        </div>
    </div>
}

export default GroupsDetail