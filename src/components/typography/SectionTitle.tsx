import { ReactNode } from "react"

const SectionTitle = ({ children, numberOfItems }: { children: ReactNode; numberOfItems?: number }) => {
  return (
    <div className="flex items-center gap-3 mb-2 font-medium">
      <h2 className="text-xl">{children}</h2>
      {numberOfItems && <div className="text-xs bg- px-1 rounded-full bg-border">{numberOfItems}</div>}
    </div>
  )
}

export default SectionTitle
