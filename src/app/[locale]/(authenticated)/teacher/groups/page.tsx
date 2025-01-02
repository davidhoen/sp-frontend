"use client"

import UpsertGroupModal from "@/components/Modals/Teacher/UpsertGroupModal"
import { Pager } from "@/components/Pager"
import GroupRow from "@/components/Rows/GroupRow"
import SearchInput from "@/components/SearchInput"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useFetchData } from "@/hooks/use-fetch-data"
import { useQueryFilter } from "@/hooks/use-query-filter"
import { getGroups } from "@/lib/queries/client/queries"
import { GroupType, TeacherGroupsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect } from "react"

const GroupsOverview = (props: { searchParams: Promise<TeacherGroupsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")

    const handleFilter = useQueryFilter();
    const onArchiveChange = handleFilter({ key: 'is_archived' });

    const { data: groups, loading, fetchData } = useFetchData<PagingSchema<GroupType>>();

    const fetchGroups = useCallback(() => {
        fetchData(getGroups);
    }, [fetchData]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups])

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
            <ToggleGroup type="single" defaultValue={searchParams.is_archived?.toString() || "false"} onValueChange={onArchiveChange}>
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