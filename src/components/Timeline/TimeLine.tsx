"use client"

import { cn } from "@/lib/utils";
import { TimeLineItem, TimeLineItemType } from "@/types";
import { ArrowUpDownIcon, BadgeCheckIcon, MessageCircleIcon, PlusIcon, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TimeLineContentCard } from "./TimeLineContentCard";
import { TimelineRatingUpdateCard } from "./TimelineRatingUpdateCard";
import { useTranslations } from "next-intl";

export function TimeLine({ items: allItems }: { items: TimeLineItem[] }) {
    const t = useTranslations("general")

    const [sortDescending, setSortDescending] = useState(true)
    const [items, setItems] = useState<TimeLineItem[]>(allItems)

    const sortItems = () => {
        const sortedItems = [...items].sort((a, b) => {
            const dateA = new Date(a.created_at).getTime()
            const dateB = new Date(b.created_at).getTime()
            return sortDescending ? dateB - dateA : dateA - dateB
        })
        setItems(sortedItems)
        setSortDescending(!sortDescending)
    }

    useEffect(() => {
        sortItems()
    }, [])

    const getIcon = (item: TimeLineItem) => {
        switch (item.type) {
            case TimeLineItemType.Feedback:
                return <MessageCircleIcon className="h-5 w-5 text-primary" strokeWidth={2.5} />
            case TimeLineItemType.Endorsement:
                // TODO: ADD GREEN COLOR
                return <BadgeCheckIcon className="h-5 w-5" strokeWidth={2.5} />
            case TimeLineItemType.RatingUpdate:
                return <StarIcon className="h-5 w-5 text-gold" strokeWidth={2.5} />
        }
    }

    const getCard = (item: TimeLineItem) => {
        switch (item.type) {
            case TimeLineItemType.Feedback:
                if (item.feedback)
                    return <TimeLineContentCard content={item.feedback} />
            case TimeLineItemType.Endorsement:
                if (item.endorsement)
                    return <TimeLineContentCard content={item.endorsement} />
            case TimeLineItemType.RatingUpdate:
                if (item.ratingUpdate)
                    return <TimelineRatingUpdateCard ratingUpdate={item.ratingUpdate } />
        }
    }

    const AddFeedbackButton = () => (
        <div className="relative flex items-center">
            <div className="absolute left-12 md:left-1/2 flex flex-col items-center -translate-x-1/2" >
                <button className="inline-flex items-center rounded-full bg-border px-4 py-1 text-sm font-medium border shadow-sm hover:bg-muted transition-colors">
                    <PlusIcon className="mr-1.5 h-4 w-4" />
                    {t("addFeedback")}
                </button>
            </div>
        </div >
    )

    return (
        <div className="relative mx-auto">
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
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-border " />

                {/* Timeline items */}
                <div className="space-y-8 p-4">
                    {!sortDescending && (
                        <AddFeedbackButton />
                    )}
                    {items.map((item, index) => (
                        <div key={index} className="relative flex items-start md:items-center">
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
        </div>
    )
}
