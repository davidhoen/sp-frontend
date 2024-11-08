import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"

export default function Skeletons({ amount = 5, className }: { amount?: number, className?: string }) {
    return <div className="flex flex-col gap-4">
        {Array.from({ length: amount }).map((_, index) => <Skeleton key={index} className={cn("bg-border", className)} />)}
    </div>
}
