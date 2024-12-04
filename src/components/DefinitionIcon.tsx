"use client"

import { InfoIcon } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { useTranslations } from "next-intl"

const DefinitionIcon = ({ description }: { description: string }) => {
    const t = useTranslations("general")
    return <HoverCard>
        <HoverCardTrigger asChild>
            <InfoIcon style={{ fill: "hsl(var(--primary))" }} className="text-primary-foreground hover:cursor-help" size={22} />
        </HoverCardTrigger>
        <HoverCardContent>
            <h2 className="font-bold">{t("definition")}</h2>
            <p className="text-sm">{description}</p>
        </HoverCardContent>
    </HoverCard>

}

export default DefinitionIcon
