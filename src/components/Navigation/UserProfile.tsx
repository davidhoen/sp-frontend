"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EXPIRED_SESSION_ROUTE } from "@/constants"
import { languageNames, Link, locales, usePathname, useRouter } from "@/i18n/routing"
import { getFullName, isTeacherUser } from "@/lib"
import { logout } from "@/lib/auth/client"
import { useUser } from "@/providers/UserProvider"
import { LogOutIcon, MessageSquareDotIcon, UserIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import UpdatePersonalCoachModal from "../Modals/Student/UpdatePersonalCoachModal"
import UserAvatar from "../UserAvatar"
import { Skeleton } from "../ui/skeleton"

export default function UserProfile() {
  const router = useRouter()
  const pathname = usePathname()

  const t = useTranslations("general")
  let { user, deleteUser } = useUser()

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  if (!user) return <Skeleton className="w-10 h-10 rounded-full bg-border" />

  user.image = "https://xsgames.co/randomusers/avatar.php?g=male"

  const onLogout = async () => {
    await logout();
    router.push(`/${EXPIRED_SESSION_ROUTE}`);
    deleteUser();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">

        <DropdownMenuLabel className="pb-0">{getFullName(user)}</DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal pt-1">{user.role.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {!isTeacherUser(user) && <>
          {/* Update personal coach */}
          <UpdatePersonalCoachModal>
            <DropdownMenuItem className="text-left" onSelect={(e) => e.preventDefault()}>
              <UserIcon size={16} strokeWidth={2.5} />
              <span>{t("myPersonalCoach")}</span>
            </DropdownMenuItem>
          </UpdatePersonalCoachModal>

          {/* Requests */}
          <Link href={"/student/requests"}>
            <DropdownMenuItem className="text-left" onSelect={(e) => e.preventDefault()}>
              <MessageSquareDotIcon size={16} strokeWidth={2.5} />
              <span>{t("feedbackRequests")}</span>
            </DropdownMenuItem>
          </Link>
        </>}

        {/* Langauges */}
        {locales.map(locale => {
          const countryCode = locale === "en" ? "gb" : locale
          return (
            <DropdownMenuItem key={locale} onClick={() => switchLanguage(locale)}>
              <Image src={`https://flagcdn.com/56x42/${countryCode}.png`} width={16} height={12} alt={locale} />
              <span>{languageNames[locale as keyof typeof languageNames]}</span>
            </DropdownMenuItem>
          )
        })}

        {/*Logout */}
        <DropdownMenuItem onClick={onLogout}>
          <LogOutIcon size={16} strokeWidth={2.5} />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
