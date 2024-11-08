import { cn } from "@/lib/utils"
import { ProfileType } from "@/types"
import { icons } from "lucide-react"

export default function ProfileTile({ profile, className }: { profile: ProfileType, className?: string }) {
    // Import icon dynamically and fallback to CircleDashed if icon is not found
    const Icon = icons[profile.icon as keyof typeof icons] || icons["CircleDashed"]
    return (
        <div className={cn("flex items-center gap-4 bg-border p-2 rounded-lg", className)}>
            <div className="p-2 bg-background rounded-full">
                <Icon size={20} strokeWidth={2.5} />
            </div>
            <span className="font-medium mr-3">{profile.title}</span>
        </div>
    )
}
