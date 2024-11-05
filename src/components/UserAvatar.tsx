import { UserType } from "@/types/User"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function UserAvatar({ user }: { user: UserType }) {
  const initails = user.first_name + " " + user.last_name
    .split(" ")
    .map(n => n[0])
    .join("")

  return (
    <Avatar>
      <AvatarImage src={user.imageUrl} />
      <AvatarFallback>{initails}</AvatarFallback>
    </Avatar>
  )
}
