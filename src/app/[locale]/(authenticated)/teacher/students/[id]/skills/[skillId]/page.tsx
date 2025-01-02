import StarRating from "@/components/StarRating"
import { TimeLine } from "@/components/Timeline/TimeLine"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Link } from "@/i18n/routing"
import { getFullName } from "@/lib"
import { auth } from "@/lib/auth/server"
import { fakeSkill } from "@/lib/fakeData"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const StudentSkillDetail = async (props: { params: Promise<{ skillId: number }> }) => {
    const params = await props.params;
    const t = await getTranslations("general")

    // TODO: Replace with get skill of student 
    const skill = fakeSkill
    // Replace with current user
    const { user: student } = await auth()

    if (!student) notFound()

    return <div className="flex flex-col gap-6">

        {/* Breadcrumb */}
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/teacher/students">{t("students")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/teacher/students/${student.id}`}>{getFullName(student)}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        {t("skills")}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{skill.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>

        <div>
            {/* Title */}
            <PageTitle className="mb-2">{skill.title}</PageTitle>
            {/* Description */}
            <p>{skill?.desc}</p>
        </div>

        {/* Rating */}
        <div className="mt-4">
            <SectionTitle>{t("rating")}</SectionTitle>
            <StarRating rating={skill.rating || 0} />
        </div>

        {/* Skill journey */}
        <div>
            <SectionTitle>{t("yourJourney")}</SectionTitle>
            <TimeLine user={student!} skillId={skill.id} />
        </div>
    </div>
}

export default StudentSkillDetail