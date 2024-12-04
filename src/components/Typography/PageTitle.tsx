import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import DefinitionIcon from "../DefinitionIcon"

const PageTitle = ({ children, className, information }: { children: ReactNode, className?: string, information?: string }) => {
  return <div className="flex items-center gap-3">
    <h1 className={cn("font-sans font-bold text-2xl border-b-2 border-primary w-fit", className)}>{children}</h1>
    {information && <DefinitionIcon description={information} />}
  </div>

}

export default PageTitle
