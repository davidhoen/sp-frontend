"use client"

import { GroupCard } from "@/components/GroupCard"
import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import PageTitle from "@/components/Typography/PageTitle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useFetchData } from "@/hooks/use-fetch-data"
import { useQueryFilter } from "@/hooks/use-query-filter"
import { getGroups } from "@/lib/queries/client/queries"
import { GroupType, StudentGroupsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect } from "react"

const GroupsOverview = (props: { searchParams: Promise<StudentGroupsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")

    const onJoinedChange = useQueryFilter({ key: 'is_joined', removeOnAll: true });

    const { data: groups, loading, fetchData } = useFetchData<PagingSchema<GroupType>>();

    const fetchGroups = useCallback(() => {
        fetchData(getGroups);
    }, [fetchData]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups])

    const renderGroups = (group: GroupType) => <GroupCard key={group.id} group={group} />

    return <div className="w-full">
        <PageTitle information={t("definitions.groups")}>{t("groups")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        {/* Is joined filter */}
        <div className="my-4">
            <ToggleGroup type="single" defaultValue={searchParams.is_joined?.toString() || "all"} onValueChange={onJoinedChange}>
                <ToggleGroupItem variant="outline" value="all">{t("allEntities", { entities: t("groups").toLowerCase() })}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="true">{t("enrolledGroups")}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="false">{t("other")}</ToggleGroupItem>
            </ToggleGroup>
        </div>

        <Pager
            pagerObject={groups}
            renderItem={renderGroups}
            loading={loading}
            emptyMessage={t("noEntitiesFound", { entities: t("groups").toLowerCase() })}
            wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start"
        />

    </div>
}

export default GroupsOverview