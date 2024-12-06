"use client"

import { InfoIcon } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { useTranslations } from "next-intl"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

const DefinitionIcon = ({ description }: { description: string }) => {
    const t = useTranslations("general")
    return <Popover>
        <PopoverTrigger asChild>
            <InfoIcon style={{ fill: "hsl(var(--primary))" }} className="text-primary-foreground hover:cursor-help" size={22} />
        </PopoverTrigger>
        <PopoverContent>
            <h2 className="font-bold">{t("definition")}</h2>
            <p className="text-sm">{description}</p>
        </PopoverContent>
    </Popover>

}

export default DefinitionIcon
