import EnrollGroupButton from "@/components/EnrollGroupButton"
import SkillCard from "@/components/SkillCard"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import UserLine from "@/components/UserLine"
import { isEnrolledToGroup } from "@/lib"
import { auth } from "@/lib/auth/server"
import { getGroup } from "@/lib/queries/server/queries"
import { UserPlusIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const GroupsDetail = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const t = await getTranslations("general")
    const group = await getGroup(params.id)
    const { user } = await auth()

    if (!group) notFound()

    const isEnrolled = isEnrolledToGroup(group, user)
    return <div className="flex flex-col gap-6">

        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
            <div>
                {/* Title */}
                <PageTitle className="mb-4">{group.name}</PageTitle>
                {/* Description */}
                <p>{group.desc}</p>
            </div>
            <div className="mt-4">
                {!isEnrolled && <Alert>
                    <UserPlusIcon size={16} />
                    <AlertTitle>{t("enrollToInteract")}</AlertTitle>
                    <AlertDescription>
                        {t("enrollToInteractDescription")}
                    </AlertDescription>
                </Alert>}
            </div>
        </div>

        {/* Enroll button */}
        {!isEnrolled && <div>
            <EnrollGroupButton group={group} />
        </div>}

        {/* Teachers */}
        <div>
            <SectionTitle>{t("teachers")}</SectionTitle>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                {group?.teachers?.map((teacher) => <UserLine key={teacher.id} user={teacher} groupId={group.id} hideActions={!isEnrolled} />)}
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
                {group?.students?.map((student) => <UserLine key={student.id} user={student} groupId={group.id} hideActions={!isEnrolled} />)}
            </div>
        </div>
    </div>
}

export default GroupsDetail