import { ReactNode } from "react"

const PageTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className="font-sans font-bold text-2xl border-b-2 border-primary w-fit">{children}</h1>
}

export default PageTitle
