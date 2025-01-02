"use client"

import UpsertGroupModal from "@/components/Modals/Teacher/UpsertGroupModal"
import { Pager } from "@/components/Pager"
import GroupRow from "@/components/Rows/GroupRow"
import SearchInput from "@/components/SearchInput"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { usePathname, useRouter } from "@/i18n/routing"
import { getGroups } from "@/lib/queries/client/queries"
import { GroupType, TeacherGroupsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const GroupsOverview = (props: { searchParams: Promise<TeacherGroupsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")
    const { replace } = useRouter()
    const pathname = usePathname();

    const [groups, setGroups] = useState<PagingSchema<GroupType>>();
    const [loading, setLoading] = useState(true);

    //Method to get the groups for the current page
    const fetchGroups = useCallback(async () => {
        setLoading(true);
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
            setLoading(false);
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
    const renderGroupRow = (group: GroupType) => <GroupRow key={group.id} group={group} mutate={fetchGroups} />

    return <div className="w-full">
        <PageTitle information={t("definitions.groups")}>{t("groups")}</PageTitle>

        {/* Search */}
        <div className="flex justify-between my-4">
            <SearchInput placeholder={t("search")} />
            <UpsertGroupModal mutate={fetchGroups}>
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

        <Pager
            pagerObject={groups}
            renderItem={renderGroupRow}
            loading={loading}
            headerItems={tableHeaders}
            emptyMessage={t("noEntitiesFound", { entities: t("groups").toLowerCase() })}
            renderAsTable
        />

    </div>
}

export default GroupsOverview