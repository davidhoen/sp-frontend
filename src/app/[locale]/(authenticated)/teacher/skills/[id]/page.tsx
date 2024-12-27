import UpsertSkillModal from "@/components/Modals/Teacher/UpsertSkillModal"
import SkillCard from "@/components/SkillCard"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import UserLine from "@/components/UserLine"
import { Link } from "@/i18n/routing"
import { getGroup, getTeacherSkill } from "@/lib/queries/server/queries"
import { PencilIcon } from "lucide-react"
import { getFormatter, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const GroupsDetail = async ({ params }: { params: { id: number } }) => {
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

            <div className="flex justify-between lg:justify-normal lg:gap-8 mb-4">
                {/* Title */}
                <PageTitle className="mb-2">{skill.title}</PageTitle>

                <div className="flex gap-2">
                    <UpsertSkillModal skill={skill} >
                        <Button variant="ghost" className="bg-border text-inherit rounded-full"><PencilIcon size={18} /></Button>
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
    </div>
}

export default GroupsDetail