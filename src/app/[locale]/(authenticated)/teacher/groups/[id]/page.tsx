import { Chip } from "@/components/Chip"
import { GroupStudentsList } from "@/components/GroupStudentsList"
import UpsertGroupModal from "@/components/Modals/Teacher/UpsertGroupModal"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import UserLine from "@/components/UserLine"
import { Link } from "@/i18n/routing"
import { getGroup } from "@/lib/queries/server/queries"
import { PencilIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const GroupsDetail = async (props: { params: Promise<{ id: number }> }) => {
    const params = await props.params;
    const t = await getTranslations("general")
    const group = await getGroup(params.id)

    if (!group) notFound()

    return <div className="flex flex-col gap-6">
        {/* Breadcrumb */}
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/teacher/groups">{t("groups")}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{group.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>

        <div className="">
            <div className="flex flex-col sm:flex-row sm:justify-between lg:justify-normal lg:gap-8 mb-4">
                {/* Title */}
                <PageTitle className="mb-4">{group.name}</PageTitle>

                <div className="flex gap-2">
                    <Button className="rounded-full">{t("archiveGroup")}</Button>
                    <UpsertGroupModal group={group} >
                        <Button variant="ghost" className="bg-border text-inherit rounded-full"><PencilIcon size={18} /></Button>
                    </UpsertGroupModal>
                </div>
            </div>

            {/* Description */}
            <p>{group.desc}</p>
        </div>

        {/* Teachers */}
        <div>
            <SectionTitle>{t("teachers")}</SectionTitle>
            <div className="flex gap-2">
                {group?.teachers?.map((teacher) => <UserLine key={teacher.id} user={teacher} hideActions={true} className="w-fit pr-8" />)}
            </div>
        </div>

        {/* Skills and students */}
        <div>
            <GroupStudentsList group={group} />
        </div>
    </div>
}

export default GroupsDetail