"use client"

import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { usePathname, useRouter } from "@/i18n/routing"
import { getGroups } from "@/lib/queries/client/queries"
import { cn } from "@/lib/utils"
import { GroupsQueryType, GroupType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"

const StudentRequests = ({ searchParams }: { searchParams: GroupsQueryType }) => {
    const t = useTranslations("general")
    const pathname = usePathname();
    const { replace } = useRouter();

    const [groups, setGroups] = useState<PagingSchema<GroupType>>();
    const [isLoading, setIsLoading] = useState(false);

    //Method to get the groups for the current page
    const fetchGroups = useCallback(async () => {
        setIsLoading(true);
        try {
            const page = parseInt(searchParams.page) || 1;
            const search = searchParams.search ?? ""
            const isJoined = searchParams.is_joined ?? ""

            const filteredGroups = await getGroups({ page, search, isJoined });

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

    const renderGroups = (request: GroupType) => <RequestCard />

    return <div className="w-full">
        <PageTitle information={t("definitions.feedbackRequests")}>{t("feedbackRequests")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("searchFeedbackRequests")} />
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

export default StudentRequests