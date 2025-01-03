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
    <SidebarMenu className="px-4">
      {items.map(item => {
        // if (item.adminOnly && !user?.is_admin) return null
        item.isActive = pathname === item.url + '/'
        const Icon = icons[item.icon as keyof typeof icons] || icons["CircleDashed"]
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.isActive}>
              <Link href={item.url} onClick={() => setOpenMobile(false)}>
                <Icon size={16} className={cn("text-primary", item.isActive && "text-inherit")} />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
