import { UserType } from "@/types/User"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { getFullName } from "@/lib"

export default function UserAvatar({ user }: { user: UserType }) {
  const initails = getFullName(user)
    .split(" ")
    .map(n => n[0])
    .join("")

  return (
    <Avatar>
      <AvatarImage src={user.image} />
      <AvatarFallback>{initails}</AvatarFallback>
    </Avatar>
  )
}
