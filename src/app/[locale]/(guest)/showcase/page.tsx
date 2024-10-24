"use client"

import UserProfile from "@/components/Navigation/UserProfile"
import SectionTitle from "@/components/SectionTitle"
import { SidebarLeft } from "@/components/Navigation/SideBarLeft"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import UserAvatar from "@/components/UserAvatar"
import { cn } from "@/lib/utils"
import { UserType } from "@/types/User"
import { ArrowBigLeft, ArrowLeftIcon, BellIcon, BookIcon, SearchIcon, StarIcon, StarsIcon, UserIcon, UsersIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { UserProvider } from "@/providers/UserProvider"

const Showcase = () => {
  const t = useTranslations()
  const fakeUser: UserType = {
    id: 1,
    email: "user@skillspassport.nl",
    name: "John Doe",
    role: "Student",
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
    created_at: new Date(),
    updated_at: new Date()
  }
  const notificationCount = 3
  const menuItems = [
    { title: "Dashboard", url: "#", icon: BookIcon, isActive: true },
    { title: "My Skills", url: "#", icon: StarIcon },
    { title: "Groups", url: "#", icon: UsersIcon },
    { title: "Competences", url: "#", icon: StarsIcon },
    { title: "Profiles", url: "#", icon: ArrowBigLeft },
    { title: "Public Profile", url: "#", icon: UserIcon }
  ]

  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <UserProvider>
      <div className="max-w-3xl mt-6 px-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="font-sans font-bold text-2xl">Showcase</h1>
          <p className="mt-2">A showcase of all of our components</p>
        </div>

        {/* User avatar (just the icon) */}
        <div className="mb-6">
          <UserAvatar user={fakeUser} />
        </div>

        {/* User profile */}
        <div>
          <UserProfile />
        </div>

        <div>
          <SectionTitle>This is a section title</SectionTitle>
          <SectionTitle numberOfItems={1}>This is a section title</SectionTitle>
        </div>
      </div>
    </UserProvider>
  )
}

export default Showcase
