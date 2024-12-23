import SkillCard from "@/components/SkillCard"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import UserLine from "@/components/UserLine"
import { getGroup } from "@/lib/queries/server/queries"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const GroupsDetail = async (props: { params: Promise<{ id: number }> }) => {
    const params = await props.params;
    const t = await getTranslations("general")
    const group = await getGroup(params.id)

    if (!group) notFound()

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
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                {group?.teachers?.map((teacher) => <UserLine key={teacher.id} user={teacher} />)}
            </div>
        </div>

        {/* Skills */}
        <div>
            <SectionTitle>{t("skills")}</SectionTitle>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 ">
                {group?.skills?.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
            </div>
        </div>

        {/* Students */}
        <div>
            <SectionTitle>{t("students")}</SectionTitle>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                {group?.students?.map((student) => <UserLine key={student.id} user={student} />)}
            </div>
        </div>
    </div>
}

export default GroupsDetail