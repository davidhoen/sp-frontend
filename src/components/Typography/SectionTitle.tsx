import { ReactNode } from "react"
import DefinitionIcon from "../DefinitionIcon";

const SectionTitle = ({ children, numberOfItems, information }: { children: ReactNode; numberOfItems?: number, information?: string }) => {
  return (
    <div className="flex items-center gap-3 mb-2" id={children?.toString()}>
      <h2 className="text-xl font-medium">{children}</h2>
      {numberOfItems && <div className="text-xs bg- px-1 rounded-full bg-border font-medium">{numberOfItems}</div>}
      {information && <DefinitionIcon description={information} />}
    </div>
  )
}

export default SectionTitle
