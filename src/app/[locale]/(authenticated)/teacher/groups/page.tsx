"use client"

import { Chip } from "@/components/Chip"
import UpsertGroupModal from "@/components/Modals/Teacher/UpsertGroupModal"
import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import { TableAction } from "@/components/TableActions"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { getGroups } from "@/lib/queries/client/queries"
import { cn } from "@/lib/utils"
import { useUser } from "@/providers/UserProvider"
import { GroupType, TeacherGroupsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const GroupsOverview = ({ searchParams }: { searchParams: TeacherGroupsQueryType }) => {
    const t = useTranslations("general")
    const { user } = useUser()
    const { replace } = useRouter()
    const pathname = usePathname();

    const [groups, setGroups] = useState<PagingSchema<GroupType>>();
    const [isLoading, setIsLoading] = useState(false);

    //Method to get the groups for the current page
    const fetchGroups = useCallback(async () => {
        setIsLoading(true);
        try {
            const page = searchParams.page || "1";
            const search = searchParams.search ?? ""
            const is_archived = searchParams.is_archived ?? ""

            const filteredGroups = await getGroups({ query: { page, search, is_archived } })
            filteredGroups?.data.map(group => ({ name: group.name, skills: group.skills, numberOfStudents: group.students?.length }));
            setGroups(filteredGroups);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [searchParams]);

    const handleIsArchived = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set('is_archived', value);
            // Remove page parameter when searching to avoid so results on search
            params.delete('page')
        } else {
            params.delete('is_archived');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        //Get the groups on page mount and the search term changes
        fetchGroups();
    }, [fetchGroups, searchParams]);

    const tableHeaders = [t("name"), t("skills"), t("students"), t("actions")]

    const renderGroupRow = (group: GroupType) => <TableRow key={group.id}>
        <TableCell>{group.name}</TableCell>
        <TableCell>
            <div className="flex gap-2">
                {group.skills?.slice(0, 3).map(skill => <Chip key={skill.id}>{skill.title}</Chip>)}
                {/* Plus icon when more then one teacher is connected */}
                {group.skills.length > 3 && (
                    <div className="flex items-center h-fit gap-1 bg-border rounded-full text-xs p-1">
                        <span>+{group.skills.length - 1}</span>
                    </div>
                )}
            </div>
        </TableCell>
        <TableCell>{group.students_count}</TableCell>
        <TableCell className="flex gap-2">
            {/* Edit */}
            <UpsertGroupModal group={group}>
                <div><TableAction type="edit" /></div>
            </UpsertGroupModal>
            {/* Delete (for admins) */}
            {user?.is_admin && <TableAction type="delete" />}
            {/* View */}
            <Link href={`/teacher/groups/${group.id}`}>
                <TableAction type="view" />
            </Link>
        </TableCell>
    </TableRow>

    return <div className="w-full">
        <PageTitle information={t("definitions.groups")}>{t("groups")}</PageTitle>

        {/* Search */}
        <div className="flex justify-between my-4">
            <SearchInput placeholder={t("search")} />
            <UpsertGroupModal>
                <Button>{t("add")}</Button>
            </UpsertGroupModal>
        </div>

        {/* Is added filter */}
        <div className="my-4">
            <ToggleGroup type="single" defaultValue={searchParams.is_archived?.toString() || "false"} onValueChange={handleIsArchived}>
                <ToggleGroupItem variant="outline" value="false">{t("activeGroups")}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="true">{t("archivedGroups")}</ToggleGroupItem>
            </ToggleGroup>
        </div>

        <div className={cn("transition-all duration-500", isLoading ? "blur-md cursor-wait" : "blur-0")}>
            {!!groups ?
                <Pager pagerObject={groups} renderItem={renderGroupRow} headerItems={tableHeaders} emptyMessage={t("noEntitiesFound", { entities: t("groups").toLowerCase() })} renderAsTable />
                :
                <Skeletons amount={15} className="w-full h-14" wrapperClass="grid gap-2" />
            }
        </div>
    </div>
}

export default GroupsOverview