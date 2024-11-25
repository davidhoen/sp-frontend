import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const PageTitle = ({ children, className }: { children: ReactNode, className?: string }) => {
  return <h1 className={cn("font-sans font-bold text-2xl border-b-2 border-primary w-fit", className)}>{children}</h1>
}

export default PageTitle
