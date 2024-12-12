
import SetCookies from "@/components/SetCookies";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <SetCookies />
      {children}
    </div>
  )
}

export default AppLayout
