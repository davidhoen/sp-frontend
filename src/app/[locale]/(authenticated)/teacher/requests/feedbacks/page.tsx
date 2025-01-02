"use client"

import { Pager } from "@/components/Pager"
import FeedbackRequestRow from "@/components/Rows/FeedbackRequestRow"
import SearchInput from "@/components/SearchInput"
import { useFetchData } from "@/hooks/use-fetch-data"
import { useQueryFilter } from "@/hooks/use-query-filter"
import { getFeedbackRequests } from "@/lib/queries/client/queries"
import { RequestType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"

const FeedbackRequests = () => {
    const t = useTranslations("general");

    const onArchiveChange = useQueryFilter({ key: 'is_archived' });

    const { data: feedbacks, loading, fetchData } = useFetchData<PagingSchema<RequestType>>();

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