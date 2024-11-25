"use client"

import { GroupCard } from "@/components/GroupCard"
import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { fakeGroup } from "@/lib/fakeData"
import { getGroups } from "@/lib/queries"
import { cn } from "@/lib/utils"
import { GroupsQueryType, GroupType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"

const GroupsOverview = ({ searchParams }: { searchParams: GroupsQueryType }) => {
    const t = useTranslations("general")

    const [groups, setGroups] = useState<PagingSchema<GroupType>>();
    const [isLoading, setIsLoading] = useState(false);

    //Method to get the groups for the current page
    const fetchGroups = useCallback(async () => {
        setIsLoading(true);
        try {
            const page = parseInt(searchParams.page) || 1;
            const search = searchParams.search ?? ""
            const isJoined = searchParams.is_joined ?? ""

            let filteredGroups = await getGroups({ page, search, isJoined });

            if (!filteredGroups?.data)
                filteredGroups = {
                    data: [fakeGroup, fakeGroup], meta: { current_page: 1, last_page: 1, per_page: 10, total: 2, }
                };

            setGroups(filteredGroups);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        //Get the groups on page mount and the search term changes
        fetchGroups();
    }, [fetchGroups, searchParams]);

    const renderGroups = (group: GroupType) => <GroupCard key={group.id} group={group} />

    return <div className="w-full">
        <PageTitle>{t("groups")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("search")} />
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