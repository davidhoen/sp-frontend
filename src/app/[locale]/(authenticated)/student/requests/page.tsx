"use client"

import AddFeedbackModal from "@/components/Modals/AddFeedbackModal"
import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/UserAvatar"
import { getFullName } from "@/lib"
import { getStudentRequests } from "@/lib/queries/client/queries"
import { cn } from "@/lib/utils"
import { RequestType, StudentGroupsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useFormatter, useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"

const StudentRequests = (props: { searchParams: Promise<StudentGroupsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")
    const format = useFormatter()

    const [requests, setRequests] = useState<PagingSchema<RequestType>>();
    const [loading, setLoading] = useState(true);

    //Method to get the request for the current page
    const fetchRequests = useCallback(async () => {
        setLoading(true);
        try {
            const page = parseInt(searchParams.page) || 1;
            const search = searchParams.search ?? ""

            const filteredGroups = await getStudentRequests({ page, search });

            setRequests(filteredGroups);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        //Get the groups on page mount and the search term changes
        fetchRequests();
    }, [fetchRequests, searchParams]);

    const renderRequest = (request: RequestType) => <div key={request.id} className="border p-4 rounded-lg">
        <div className="flex justify-between items-center">
            <div className="flex gap-2">
                <UserAvatar user={request.requester} />
                <div className="flex flex-col gap-1">
                    <span className="font-bold">{getFullName(request.requester)}</span>
                    <div className="text-xs text-muted-content">{format.dateTime(new Date(request.created_at), { dateStyle: "medium" })}</div>
                </div>
            </div>
            <Badge>{t("feedback")}</Badge>
        </div>
        <div className="flex flex-col mt-4">
            <span className="font-bold">{t("group")}: </span>
            <span>{request.group?.name}</span>
        </div>
        <div className="flex justify-between mt-4 mb-4">
            <div className="flex flex-col">
                <span className="font-bold">{t("skill")}: </span>
                <Badge variant="secondary">{request.skill.title}</Badge>
            </div>
            <div className="flex flex-col ">
                <span className="font-bold">{t("event")}: </span>
                <span>{request.title}</span>
            </div>
        </div>
        <div className="w-full flex justify-end">
            <AddFeedbackModal request={request} parentMutate={fetchRequests}>
                <Button className="w-full md:w-fit">{t("addFeedback")}</Button>
            </AddFeedbackModal>
        </div>
    </div>

    return <div className="w-full">
        <PageTitle information={t("definitions.feedbackRequests")}>{t("feedbackRequests")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("searchFeedbackRequests")} />
        </div>

        <Pager pagerObject={requests} renderItem={renderRequest} loading={loading} emptyMessage={t("noEntitiesFound", { entities: t("requests").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start" />

    </div>
}

export default StudentRequests