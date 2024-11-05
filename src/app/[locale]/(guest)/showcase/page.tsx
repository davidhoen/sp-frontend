"use client"

import { FeedbackCard } from "@/components/FeedbackCard"
import UserProfile from "@/components/Navigation/UserProfile"
import StarRating from "@/components/StarRating"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import UserAvatar from "@/components/UserAvatar"
import { UserProvider } from "@/providers/UserProvider"
import { FeedbackType } from "@/types"
import { UserType } from "@/types/User"

const Showcase = () => {
  const fakeUser: UserType = {
    id: 1,
    email: "user@skillspassport.nl",
    name: "John Doe",
    role: "Student",
    imageUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
    created_at: new Date(),
    updated_at: new Date()
  }

  const feedback: FeedbackType = {
    id: 1,
    user: fakeUser,
    created_at: new Date(),
    event: {
      id: 1,
      title: "Start presentation"
    },
    content: "Improvement could be incorporating more real-world examples to illustrate the points. Nevertheless, it was a compelling presentation."
  }

  return (
    <UserProvider>
      <div className=" mt-6 px-8">
        {/* Page title */}
        <div className="mb-8">
          <PageTitle>Showcase</PageTitle>
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

        <div className="flex flex-col">
          <StarRating rating={1.8} /> 1.8
          <StarRating rating={3.25} />
          <StarRating rating={3.5} />
          <StarRating rating={3.75} />
          <StarRating rating={4} />
        </div>

        <FeedbackCard feedback={feedback} user={fakeUser} />
      </div>
    </UserProvider>
  )
}

export default Showcase
