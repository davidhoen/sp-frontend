"use client"

import UserProfile from "@/components/Navigation/UserProfile"
import SectionTitle from "@/components/SectionTitle"
import UserAvatar from "@/components/UserAvatar"
import { UserType } from "@/types/User"
import { useTranslations } from "next-intl"

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

  return (
    <div className="max-w-5xl mx-auto mt-6 px-8">
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
        <UserProfile user={fakeUser} />
      </div>

      <div>
        <SectionTitle>This is a section title</SectionTitle>
        <SectionTitle numberOfItems={1}>This is a section title</SectionTitle>
      </div>
    </div>
  )
}

export default Showcase
