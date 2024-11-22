import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "profile" | "default";
}

function Skeleton({
  className,
  type = "default",
  ...props
}: SkeletonProps) {

  if (type === "profile")
    return <div className="flex gap-2 mb-6">
      <div className="animate-pulse h-12 w-12 rounded-full bg-border" />
      <div className="flex flex-col gap-2 justify-center">
        <div className="animate-pulse h-4 w-[200px] bg-border" />
        <div className="animate-pulse h-4 w-[250px] bg-border" />
      </div>
    </div>

  return <div
    className={cn("animate-pulse rounded-md bg-border", className)}
    {...props}
  />
}

export { Skeleton }
