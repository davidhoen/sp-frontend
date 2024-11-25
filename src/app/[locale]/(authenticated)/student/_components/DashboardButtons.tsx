"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { useUser } from "@/providers/UserProvider"
import { PlusIcon, UserIcon } from "lucide-react"

export const DashboardButtons = () => {
    const { basePath } = useUser()

    return <div className="flex gap-2">
        <Link href={{ pathname: `${basePath}/skills/`, query: "is_added=false" }}>
            <Button className="rounded-full"><PlusIcon size={16} />Add a skill</Button>
        </Link>
        <Button className="rounded-full" variant="outline"><UserIcon size={16} />Public profile</Button>
    </div>

}