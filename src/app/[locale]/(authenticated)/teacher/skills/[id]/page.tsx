import UpsertSkillModal from "@/components/Modals/Teacher/UpsertSkillModal"
import { TableAction } from "@/components/TableActions"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import UserLine from "@/components/UserLine"
import { Link } from "@/i18n/routing"
import { getTeacherSkill } from "@/lib/queries/server/queries"
import { UsersIcon } from "lucide-react"
import { getFormatter, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const SkillDetail = async (props: { params: Promise<{ id: number }> }) => {
    const params = await props.params;
    const t = await getTranslations("general")
    const skill = await getTeacherSkill(params.id)

    const format = await getFormatter()

    if (!skill) notFound()

    return <div className="flex flex-col gap-6">

        {/* Breadcrumb */}
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/teacher/skills">{t("skills")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{skill.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>

        <div className="">

            <div className="flex justify-between lg:justify-normal items-center lg:gap-8 mb-4">
                {/* Title */}
                <PageTitle className="mb-2">{skill.title}</PageTitle>

                <div className="flex gap-2">
                    <UpsertSkillModal skill={skill} >
                        <div><TableAction type="edit" resizes /></div>
                    </UpsertSkillModal>
                </div>
            </div>

            <div className="text-xs text-muted-foreground mb-4">{t("lastEditedByOn", { name: "John Doe", date: format.dateTime(new Date(), { dateStyle: "medium" }) })}</div>

            {/* Description */}
            <p>{skill.desc}</p>
        </div>

        {/* Competency */}
        <div>
            <div className="font-bold mb-2">{t("competence")}</div>
            {skill.competency && <Link href={`/student/competencies/${skill.competency.id}`}>
                <div className="bg-sidebar-accent px-4 py-1 rounded-full w-fit">{skill.competency.title}</div>
            </Link>}
        </div>

        {/* Groups */}
        <div>
            <SectionTitle numberOfItems={skill.groups?.length}>{t("groups")}</SectionTitle>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
                {skill?.groups?.map((group) => <div key={group.id}>
                    <Link href={`/teacher/groups/${group.id}`}>
                        <span className="text-xl font-sans">{group.name}</span>
                        <p>{group.desc}</p>
                        <div className="flex items-center gap-2 mt-4">
                            <UsersIcon size={18} />
                            <span>{group.students_count} {t("students")}</span>
                        </div>
                    </Link>
                </div>
                )}
            </div>
            {!skill?.groups?.length && <div>{t("noEntitiesFound", { entities: t("groups").toLowerCase() })}</div>}
        </div>
    </div>
}

export default SkillDetail