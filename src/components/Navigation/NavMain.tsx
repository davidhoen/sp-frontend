"use client"

import { icons } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Link, usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { NavItem } from "@/types"
import { useUser } from "@/providers/UserProvider"

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const { user } = useUser()

  return (
    <SidebarMenu className="px-2">
      {items.map(item => {
        if (item.adminOnly && !user?.is_admin) return null
        item.isActive = (!item.isDashboard && pathname.startsWith(item.url)) || (item.isDashboard && pathname === item.url + "/")
        const Icon = icons[item.icon as keyof typeof icons] || icons["CircleDashed"]
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.isActive} className="px-4 h-11 rounded-full">
              <Link href={item.url} onClick={() => setOpenMobile(false)} className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={cn("text-primary", item.isActive && "text-inherit")} />
                  <span>{item.title}</span>
                </div>
                {item.badge && <span className="border rounded-full px-2 text-xs">{item.badge}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
