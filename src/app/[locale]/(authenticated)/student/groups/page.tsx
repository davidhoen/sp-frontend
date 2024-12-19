"use client"

import { GroupCard } from "@/components/GroupCard"
import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { usePathname, useRouter } from "@/i18n/routing"
import { getGroups } from "@/lib/queries/client/queries"
import { cn } from "@/lib/utils"
import { StudentGroupsQueryType, GroupType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const GroupsOverview = ({ searchParams }: { searchParams: StudentGroupsQueryType }) => {
    const t = useTranslations("general")
    const pathname = usePathname();
    const { replace } = useRouter();

    const [groups, setGroups] = useState<PagingSchema<GroupType>>();
    const [isLoading, setIsLoading] = useState(false);

    //Method to get the groups for the current page
    const fetchGroups = useCallback(async () => {
        setIsLoading(true);
        try {
            const page = searchParams.page || "1";
            const search = searchParams.search ?? ""
            const isJoined = searchParams.is_joined ?? ""

            const filteredGroups = await getGroups({ query: { page, search, isJoined } });

            setGroups(filteredGroups);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
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

        <div className={cn("transition-all duration-500", isLoading ? "blur-md cursor-wait" : "blur-0")}>
            {!!groups ?
                <Pager pagerObject={groups} renderItem={renderGroups} emptyMessage={t("noEntitiesFound", { entities: t("groups").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start" />
                :
                <Skeletons amount={15} className="w-full h-28" />
            }
        </div>
    </div>
}

export default GroupsOverview