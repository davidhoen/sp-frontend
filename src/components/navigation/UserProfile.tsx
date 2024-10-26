"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { languageNames, Link, locales, usePathname, useRouter } from "@/i18n/routing"
import { useUser } from "@/providers/UserProvider"
import { UserType } from "@/types/User"
import { LogOutIcon, UserIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import UserAvatar from "../UserAvatar"
import { Skeleton } from "../ui/skeleton"

export default function UserProfile() {
  const router = useRouter()
  const pathname = usePathname()

  const t = useTranslations("general")
  let { user, logout } = useUser()

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  if (!user) return <Skeleton className="w-10 h-10 rounded-full bg-border" />

  user.role = "Student"
  user.imageUrl = "https://xsgames.co/randomusers/avatar.php?g=male"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="pe-12">
        <DropdownMenuLabel className="pb-0">{user.name}</DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal pt-1">{user.role}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* View profile */}
        <Link href="#">
          <DropdownMenuItem>
            <UserIcon size={16} strokeWidth={2.5} />
            <span>{t("viewProfile")}</span>
          </DropdownMenuItem>
        </Link>

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
        <DropdownMenuItem onClick={logout}>
          <LogOutIcon size={16} strokeWidth={2.5} />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
