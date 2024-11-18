"use client"

import { ContentCard } from "@/components/ContentCard"
import AddFeedbackModal from "@/components/Modals/AddFeedbackModal"
import RequestEndorsementModal from "@/components/Modals/RequestEndorsementModal"
import RequestFeedbackModal from "@/components/Modals/RequestFeedbackModal"
import UpdateRatingModal from "@/components/Modals/UpdateRatingModal"
import UserProfile from "@/components/Navigation/UserProfile"
import ProfileTile from "@/components/ProfileTile"
import SkillCard from "@/components/SkillCard"
import StarRating from "@/components/StarRating"
import { TimeLine } from "@/components/Timeline/TimeLine"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import UserAvatar from "@/components/UserAvatar"
import { UserProvider } from "@/providers/UserProvider"
import { EndorsementType, FeedbackType, ProfileType, RatingHistoryType, SkillType, TimeLineItemType, TimeLineItemTypeEnum } from "@/types"
import { UserType } from "@/types/User"

const Showcase = () => {
  const fakeUser: UserType = {
    id: 1,
    email: "user@skillspassport.nl",
    first_name: "John",
    last_name: "John",
    role: {
      id: 1,
      name: "Student",
      is_teacher: false,
      is_head_teacher: false
    },
    role_id: 1,
    image: "https://xsgames.co/randomusers/avatar.php?g=male",
  }

  const fakeTeacher: UserType = {
    id: 1,
    email: "teacher@skillspassport.nl",
    first_name: "Jane",
    last_name: "Robbertson",
    role: {
      id: 2,
      name: "Teacher",
      is_teacher: true,
      is_head_teacher: false
    },
    role_id: 2,
    image: "https://xsgames.co/randomusers/avatar.php?g=female",
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

  const endorsement: EndorsementType = {
    id: 1,
    user: fakeTeacher,
    event: {
      id: 1,
      title: "Midterm evaluation"
    },
    content: "Impressive command over the subject matter and ability to engage the audience",
    rating: 3,
    is_approved: true,
    created_by: fakeUser,
    created_at: new Date()
  }

  const ratingUpdate: RatingHistoryType = {
    rating: 3,
    created_at: new Date()
  }

  const fakeSkill: SkillType = {
    id: 1,
    title: "Presenting",
    desc: "React is a JavaScript library for building user interfaces",
    competency: {
      id: 1,
      title: "Communication",
      desc: "You have a good understanding of the subject matter and can apply it in real-world scenarios",
      overview: "Competency overview",
      skills: [],
      profiles: [],
      created_at: new Date(),
    },
    ratings: [
      {
        rating: 3,
        created_at: new Date()
      },
      {
        rating: 4,
        created_at: new Date()
      }
    ],
    created_at: new Date(),
    groups_count: 0,
    is_added: false,
  }

  const fakeSkill2: SkillType = {
    id: 2,
    title: "Creativity",
    desc: "React is a JavaScript library for building user interfaces",
    competency: {
      id: 1,
      title: "Communication",
      desc: "You have a good understanding of the subject matter and can apply it in real-world scenarios",
      overview: "Competency overview",
      skills: [],
      profiles: [],
      created_at: new Date(),
    },
    ratings: [],
    created_at: new Date(),
    groups_count: 0,
    is_added: false,
  }

  return (
    <UserProvider>
      <div className=" mt-6 px-8 flex flex-col gap-6">
        {/* Page title */}
        <div className="mb-8">
          <PageTitle>Showcase</PageTitle>
          <p className="mt-2">A showcase of all of our components</p>
        </div>

        {/* User avatar (just the icon) */}
        <div>
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
          <StarRating rating={1.8} />
          <StarRating rating={3.25} />
          <StarRating rating={3.5} />
          <StarRating rating={3.75} />
          <StarRating rating={4} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ProfileTile profile={{ title: "Technologist", icon: "MonitorCog" } as ProfileType} />
          <ProfileTile profile={{ title: "Director", icon: "Clapperboard" } as ProfileType} />
          <ProfileTile profile={{ title: "Analyst", icon: "ChartLine" } as ProfileType} />
          <ProfileTile profile={{ title: "Innovator", icon: "Lightbulb" } as ProfileType} />
          <ProfileTile profile={{ title: "Innovator", icon: "Weird string" } as ProfileType} />
        </div>

        <div>
          <SkillCard skill={fakeSkill} />
          <SkillCard skill={fakeSkill2} />
        </div>

        <div>
          <ContentCard content={feedback} />
        </div>

        <div>
          <ContentCard content={endorsement} />
        </div>

        <TimeLine
          items={[
            { type: TimeLineItemTypeEnum.Feedback, created_at: new Date("7-8-21"), feedback },
            { type: TimeLineItemTypeEnum.Endorsement, created_at: new Date(), endorsement },
            { type: TimeLineItemTypeEnum.RatingUpdate, created_at: new Date("8-8-21"), ratingUpdate }
          ]}
          user={fakeUser}
          skillId={fakeSkill.id}
        />

        <UpdateRatingModal>
          Open rating modal
        </UpdateRatingModal>

        <AddFeedbackModal>
          Add feedback modal
        </AddFeedbackModal>

        <RequestEndorsementModal requestFromUser={fakeUser}>
          Request endorsement form user modal
        </RequestEndorsementModal>

        <RequestEndorsementModal>
          Request endorsement modal
        </RequestEndorsementModal>

        <RequestFeedbackModal>
          Request feedback modal
        </RequestFeedbackModal>

        <RequestFeedbackModal requestFromUser={fakeUser}>
          Request from user feedback modal
        </RequestFeedbackModal>

      </div>
    </UserProvider>
  )
}

export default Showcase
