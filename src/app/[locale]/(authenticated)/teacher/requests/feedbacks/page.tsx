"use client"

import { Pager } from "@/components/Pager"
import FeedbackRequestRow from "@/components/Rows/FeedbackRequestRow"
import SearchInput from "@/components/SearchInput"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useFetchData } from "@/hooks/use-fetch-data"
import { useQueryFilter } from "@/hooks/use-query-filter"
import { getFeedbackRequests } from "@/lib/queries/client/queries"
import { FeedbackRequestsQueryType, RequestType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect } from "react"

const FeedbackRequests = (props: { searchParams: Promise<FeedbackRequestsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general");

    const onArchiveChange = useQueryFilter({ key: 'is_archived' });

    // TODO: Replace with const
    let { data: feedbacks, loading, fetchData } = useFetchData<PagingSchema<RequestType>>();

    if (!feedbacks)
        feedbacks = {
            data: [
                { id: "1", requester: { id: "1", first_name: "John", last_name: "Doe", email: "john.doe@example.com", role: "user", is_teacher: false, is_head_teacher: false, is_admin: false }, created_at: new Date(), group: { id: "1", name: "Group 1" }, skill: { id: "1", title: "Skill 1" }, title: "Event 1" },
            ],
            meta: {
                total: 0, current_page: 1, last_page: 2, per_page: 10
            }
        }

    const fetchFeedbackRequests = useCallback(() => {
        fetchData(getFeedbackRequests);
    }, [fetchData]);

    useEffect(() => {
        fetchFeedbackRequests();
    }, [fetchFeedbackRequests])

    const tableHeaders = [t("name"), t("group"), t("skill"), t("event"), t("actions")]
    const renderFeedbackRequest = (request: RequestType) => <FeedbackRequestRow key={request.id} request={request} mutate={fetchFeedbackRequests} />

    return <div className="w-full">

        {/* Search */}
        <div className="flex justify-between my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        {/* Is archived filter */}
        <div className="my-4">
            <ToggleGroup type="single" defaultValue={searchParams.is_archived?.toString() || "false"} onValueChange={onArchiveChange}>
                <ToggleGroupItem variant="outline" value="false">{t("open")}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="true">{t("archived")}</ToggleGroupItem>
            </ToggleGroup>
        </div>

        <Pager
            pagerObject={feedbacks}
            renderItem={renderFeedbackRequest}
            loading={loading}
            headerItems={tableHeaders}
            emptyMessage={t("noEntitiesFound", { entities: t("feedbackRequests").toLowerCase() })}
            renderAsTable
        />
    </div>
}

export default FeedbackRequests