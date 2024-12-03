
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">{children}</div>
  )
}

export default AppLayout
