"use client"

import { Pager } from "@/components/Pager"
import FeedbackRequestRow from "@/components/Rows/FeedbackRequestRow"
import SearchInput from "@/components/SearchInput"
import { getFeedbackRequests } from "@/lib/queries/client/queries"
import { RequestType, StudentsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"

const FeedbackRequests = (props: { searchParams: Promise<StudentsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general");

    const [feedbacks, setFeedbacks] = useState<PagingSchema<RequestType>>();
    const [loading, setLoading] = useState(true);

    //Method to get the feedbacks for the current page
    const fetchFeedbackRequests = useCallback(async () => {
        setLoading(true);
        try {
            const page = searchParams.page || "1";
            const search = searchParams.search ?? ""

            const filteredSkills = await getFeedbackRequests({ query: { page, search } });
            setFeedbacks(filteredSkills);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        //Get the students on page mount and the search term changes
        fetchFeedbackRequests();
    }, [fetchFeedbackRequests, searchParams]);

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