"use client"

import { cn } from "@/lib/utils"
import { NavItem } from "@/types"
import { ArrowLeftIcon, BellIcon, SearchIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { SidebarLeft } from "./SideBarLeft"
import UserProfile from "./UserProfile"
import Notifications from "./Notifications"

const SideBar = ({ items, children }: { items: NavItem[]; children: ReactNode }) => {
  const t = useTranslations()

  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <SidebarProvider>
      <SidebarLeft items={items} />
      <SidebarInset className="md:max-w-[calc(100vw-var(--sidebar-width))]">
        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 bg-background border-b w-full">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="md:hidden ml-2" />

            {/* Search */}
            {/* <div className="hidden md:flex items-center">
              <Input placeholder="Search..." className={cn("h-8 w-full md:w-[300px] lg:w-[400px]", showMobileSearch ? "flex" : "hidden md:flex")} />
            </div>
            <Button variant="ghost" size="icon" className="shrink-0 md:hidden" onClick={() => setShowMobileSearch(true)}>
              <SearchIcon size={16} />
              <span className="sr-only">{t("general.search")}</span>
            </Button> */}

            {/* Search mobile */}
            {/* {showMobileSearch && (
              <div className="fixed inset-0 z-50 md:hidden h-fit bg-background">
                <div className="flex h-16 items-center gap-2 border-b px-3">
                  <Button variant="ghost" size="icon" onClick={() => setShowMobileSearch(false)}>
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <Input type="search" placeholder={t("general.search")} className="h-10 w-full " autoFocus />
                </div>
              </div>
            )} */}
          </div>

          {/* User profile and notifications */}
          <div className="flex items-center gap-4 mr-4">
            {/* Notifications */}
            <Notifications />

            {/* User profile */}
            <UserProfile />
          </div>
        </header>
        <main className="">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SideBar
