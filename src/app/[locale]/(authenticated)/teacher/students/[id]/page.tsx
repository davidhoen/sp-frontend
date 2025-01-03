import { Chip } from "@/components/Chip"
import StarRating from "@/components/StarRating"
import { StudentEndorsementList } from "@/components/StudentEndorsementList"
import { StudentFeedbackList } from "@/components/StudentFeedbackList"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import UserAvatar from "@/components/UserAvatar"
import { Link } from "@/i18n/routing"
import { getFullName } from "@/lib"
import { getStudent } from "@/lib/queries/server/queries"
import { BadgeCheckIcon, MessageCircleIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const StudentDetail = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const t = await getTranslations("general")
    const student = await getStudent(params.id)

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
                        <BreadcrumbPage>{getFullName(student)}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>

        {/* Title */}
        <PageTitle className="mb-2">{getFullName(student)}</PageTitle>

        {/* Avatar card */}
        <div className="flex gap-4 items-start">
            <UserAvatar user={student} />

            <div>
                <p>{student.job_title}</p>
                <p>{student.field}</p>
                <p>{student.address}</p>
            </div>
        </div>

        {/* Groups */}
        <div>
            <SectionTitle numberOfItems={student.groups?.length}>{t("groups")}</SectionTitle>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 items-stretch">
                {student?.groups?.map((group) => <div key={group.id} className="flex flex-col gap-4 p-4 border rounded-lg bg-muted">
                    <span className="text-xl font-sans font-bold">{group.name}</span>
                    <div className="flex flex-col gap-2">
                        {group.skills?.map(skill => <Link key={skill.id} href={`/teacher/students/${student.id}/skills/${skill.id}`}>
                            <div className="grid grid-cols-3 gap-2 items-center hover:bg-accent p-2 border rounded-lg bg-background">
                                <Chip className="w-fit">{skill.title}</Chip>
                                <StarRating rating={skill.rating} />
                                <div className="flex flex-col text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1"><MessageCircleIcon size={12} />{skill.count_feedbacks}</div>
                                    <div className="flex items-center gap-1"><BadgeCheckIcon size={12} />{skill.count_endorsements}</div>
                                </div>
                            </div>
                        </Link>)}
                    </div>
                </div>
                )}
            </div>
            {!student?.groups?.length && <div>{t("noEntitiesFound", { entities: t("groups").toLowerCase() })}</div>}
        </div>

        {/* Recent feedbacks */}
        <StudentFeedbackList studentId={student.id} />

        {/* Recent endorsements */}
        <StudentEndorsementList studentId={student.id} />
    </div>
}

export default StudentDetail