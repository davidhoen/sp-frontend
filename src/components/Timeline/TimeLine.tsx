"use client"

import { useTimeLineItems } from "@/hooks/use-timeline-items";
import { endorsement, feedback, ratingUpdate } from "@/lib/fakeData";
import { cn } from "@/lib/utils";
import { TimeLineItemType, TimeLineItemTypeEnum } from "@/types";
import { UserType } from "@/types/User";
import { ArrowUpDownIcon, BadgeCheckIcon, MessageCircleIcon, PlusIcon, StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import AddFeedbackModal from "../Modals/AddFeedbackModal";
import { Skeleton } from "../ui/skeleton";
import { TimeLineContentCard } from "./TimeLineContentCard";
import { TimelineRatingUpdateCard } from "./TimelineRatingUpdateCard";

const fakeItems = [
    { type: TimeLineItemTypeEnum.Feedback, created_at: new Date("7-8-21"), feedback },
    { type: TimeLineItemTypeEnum.Endorsement, created_at: new Date(), endorsement },
    { type: TimeLineItemTypeEnum.RatingUpdate, created_at: new Date("8-8-21"), ratingUpdate }
]

export function TimeLine({ user, skillId }: { user: UserType, skillId: string }) {
    const t = useTranslations("general")
    let { data: allItems, isLoading, mutate } = useTimeLineItems(skillId)

    if (!allItems)
        allItems = fakeItems

    const [sortDescending, setSortDescending] = useState(true)
    const [items, setItems] = useState<TimeLineItemType[]>(allItems)

    const sortItems = () => {
        const sortedItems = items.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime()
            const dateB = new Date(b.created_at).getTime()
            return sortDescending ? dateB - dateA : dateA - dateB
        })
        setItems(sortedItems)
        setSortDescending(!sortDescending)
    }

    useEffect(() => {
        // Causes build warning, but dont know how to fix
        sortItems()
    }, [])

    const getIcon = (item: TimeLineItemType) => {
        switch (item.type) {
            case TimeLineItemTypeEnum.Feedback:
                return <MessageCircleIcon className="h-5 w-5 text-primary" strokeWidth={2.5} />
            case TimeLineItemTypeEnum.Endorsement:
                // TODO: ADD GREEN COLOR
                return <BadgeCheckIcon className="h-5 w-5" strokeWidth={2.5} />
            case TimeLineItemTypeEnum.RatingUpdate:
                return <StarIcon className="h-5 w-5 text-gold" strokeWidth={2.5} />
        }
    }

    const getCard = (item: TimeLineItemType) => {
        switch (item.type) {
            case TimeLineItemTypeEnum.Feedback:
                if (item.feedback)
                    return <TimeLineContentCard content={item.feedback} />
            case TimeLineItemTypeEnum.Endorsement:
                if (item.endorsement)
                    return <TimeLineContentCard content={item.endorsement} />
            case TimeLineItemTypeEnum.RatingUpdate:
                if (item.ratingUpdate)
                    // The rating update does not have a user, so we pass the user from the parent component
                    return <TimelineRatingUpdateCard ratingUpdate={item.ratingUpdate} user={user} />
        }
    }

    const AddFeedbackButton = () => (
        <AddFeedbackModal skillId={skillId} mutate={mutate}>
            <div className="relative flex items-center">
                <div className="absolute -left-4 md:left-1/2 flex flex-col items-center md:-translate-x-1/2" >
                    <button className="inline-flex items-center text-nowrap rounded-full bg-border px-4 py-1 text-sm font-medium border shadow-sm hover:bg-muted transition-colors">
                        <PlusIcon className="mr-1.5 h-4 w-4" />
                        {t("addFeedback")}
                    </button>
                </div>
            </div>
        </AddFeedbackModal>
    )

    return (
        <div className="relative mx-auto w-full">
            {/* Sort items */}
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={sortItems}
                    className="inline-flex items-center rounded-full bg-background px-4 py-1.5 text-sm font-medium border shadow-sm hover:bg-muted transition-colors"
                >
                    <ArrowUpDownIcon className="mr-1.5 h-4 w-4" />
                    Sort by date
                </button>
            </div>

            {/* Timeline container */}
            <div className="relative w-full">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-border " />

                {/* Timeline items */}
                <div className="space-y-8 p-4 w-full">
                    {!sortDescending && (
                        <AddFeedbackButton />
                    )}

                    {/* Loading skeletons */}
                    {isLoading && Array.from({ length: 5 }).map((_, index) =>
                        <div className="relative flex items-start md:items-center" key={index}>
                            <Skeleton className={cn("bg-border", "w-full h-24 ml-12 md:ml-0 md:w-[calc(50%-20px)]", index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8')} />
                        </div>
                    )}

                    {!isLoading && items.map((item, index) => (
                        <div key={index} className="relative flex items-start md:items-center w-full">
                            {/* Date marker */}
                            <div className="absolute left-0 md:left-1/2 flex flex-col items-center -translate-x-1/2 bg-background">
                                <div className="rounded-full h-8 w-8 md:h-10 md:w-10 border flex items-center justify-center">
                                    {getIcon(item)}
                                </div>
                                <div className="mt-1.5 text-xs ">
                                    <div>{new Date(item.created_at).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                                    <div>{new Date(item.created_at).getFullYear()}</div>
                                </div>
                            </div>
                            <div className={cn("ml-12 md:ml-0 w-full md:w-[calc(50%-20px)]", index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8')}>
                                {getCard(item)}
                            </div>
                        </div>
                    ))}
                    {sortDescending && (
                        <AddFeedbackButton />
                    )}
                </div>
            </div>
        </div >
    )
}
