"use client"

import * as React from "react"

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { NavItem } from "@/types"
import Logo from "./Logo"
import { NavMain } from "./NavMain"

export function SidebarLeft({ items, ...props }: React.ComponentProps<typeof Sidebar> & { items: NavItem[] }) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="ml-4 m-2">
          <Logo />
        </div>
        <NavMain items={items} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
    </Sidebar>
  )
}
