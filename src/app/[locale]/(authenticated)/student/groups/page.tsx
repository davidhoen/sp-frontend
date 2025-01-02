"use client"

import { GroupCard } from "@/components/GroupCard"
import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import PageTitle from "@/components/Typography/PageTitle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { usePathname, useRouter } from "@/i18n/routing"
import { getGroups } from "@/lib/queries/client/queries"
import { GroupType, StudentGroupsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const GroupsOverview = (props: { searchParams: Promise<StudentGroupsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")
    const pathname = usePathname();
    const { replace } = useRouter();

    const [groups, setGroups] = useState<PagingSchema<GroupType>>();
    const [loading, setLoading] = useState(true);

    //Method to get the groups for the current page
    const fetchGroups = useCallback(async () => {
        setLoading(true);
        try {
            const page = searchParams.page || "1";
            const search = searchParams.search ?? ""
            const is_joined = searchParams.is_joined ?? ""

            const filteredGroups = await getGroups({ query: { page, search, is_joined } });

            setGroups(filteredGroups);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [searchParams]);

    const handleIsJoinedFilter = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set('is_joined', value);
            // Remove page parameter when searching to avoid so results on search
            params.delete('page')
        } else {
            params.delete('is_joined');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        //Get the groups on page mount and the search term changes
        fetchGroups();
    }, [fetchGroups, searchParams]);

    const renderGroups = (group: GroupType) => <GroupCard key={group.id} group={group} />

    return <div className="w-full">
        <PageTitle information={t("definitions.groups")}>{t("groups")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        {/* Is joined filter */}
        <div className="my-4">
            <ToggleGroup type="single" defaultValue={searchParams.is_joined?.toString() || "all"} onValueChange={handleIsJoinedFilter}>
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