"use client"

import { Pager } from "@/components/Pager"
import EndorsementRequestRow from "@/components/Rows/EndorsementRequestRow"
import SearchInput from "@/components/SearchInput"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useFetchData } from "@/hooks/use-fetch-data"
import { useQueryFilter } from "@/hooks/use-query-filter"
import { getEndorsementRequests } from "@/lib/queries/client/queries"
import { EndorsementRequestsQueryType, RequestType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect } from "react"

const EndorsementRequests = (props: { searchParams: Promise<EndorsementRequestsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general");

    const onArchiveChange = useQueryFilter({ key: 'is_archived' });
    const onReviewChange = useQueryFilter({ key: 'type' });

    const { data: feedbacks, loading, fetchData } = useFetchData<PagingSchema<RequestType>>();

    const fetchEndorsementRequests = useCallback(() => {
        fetchData(getEndorsementRequests);
    }, [fetchData]);

    useEffect(() => {
        fetchEndorsementRequests();
    }, [fetchEndorsementRequests])

    const tableHeaders = [t("name"), t("email"), t("skill"), t("event"), t("rating"), t("actions")]
    const renderEndorsementRequest = (request: RequestType) => <EndorsementRequestRow key={request.id} request={request} mutate={fetchEndorsementRequests} />

    return <div className="w-full">

        {/* Search */}
        <div className="flex justify-between my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        {/*Is archived  */}
        <div className="my-4">
            <ToggleGroup type="single" defaultValue={searchParams.is_archived?.toString() || "false"} onValueChange={onArchiveChange}>
                <ToggleGroupItem variant="outline" value="false">{t("open")}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="true">{t("archived")}</ToggleGroupItem>
            </ToggleGroup>
        </div>

        {/* Type of requests */}
        <div className="my-4">
            <ToggleGroup type="single" defaultValue={searchParams.type?.toString()} onValueChange={onReviewChange}>
                <ToggleGroupItem variant="outline" value="request">{t("endorsementRequests")}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="review">{t("endorsementReviews")}</ToggleGroupItem>
            </ToggleGroup>
        </div>

        <Pager
            pagerObject={feedbacks}
            renderItem={renderEndorsementRequest}
            loading={loading}
            headerItems={tableHeaders}
            emptyMessage={t("noEntitiesFound", { entities: t("endorsementRequests").toLowerCase() })}
            renderAsTable
        />
    </div>
}

export default EndorsementRequests