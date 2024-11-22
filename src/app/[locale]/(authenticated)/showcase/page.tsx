
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
import { endorsement, fakeSkill, fakeSkill2, fakeStudent, feedback } from "@/lib/fakeData"
import { UserProvider } from "@/providers/UserProvider"
import { ProfileType } from "@/types"

const Showcase = () => {


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
          <UserAvatar user={fakeStudent} />
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
          user={fakeStudent}
          skillId={fakeSkill.id}
        />

        <UpdateRatingModal skillId={fakeSkill.id}>
          Open rating modal
        </UpdateRatingModal>

        <AddFeedbackModal>
          Add feedback modal
        </AddFeedbackModal>

        <RequestEndorsementModal requestFromUser={fakeStudent}>
          Request endorsement form user modal
        </RequestEndorsementModal>

        <RequestEndorsementModal>
          Request endorsement modal
        </RequestEndorsementModal>

        <RequestFeedbackModal requestFromUser={fakeStudent}>
          Request from user feedback modal
        </RequestFeedbackModal>

      </div>
    </UserProvider>
  )
}

export default Showcase
