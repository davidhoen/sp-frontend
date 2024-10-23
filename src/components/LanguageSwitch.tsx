"use client"

import { languageNames, locales, usePathname, useRouter } from "../i18n/routing"
import { DropdownButton } from "./DropdownLink"

export function LanguageSwitch() {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <>
      {locales.map((lang, index) => {
        // Add a | separator between languages
        return (
          <DropdownButton onClick={() => switchLanguage(lang)} key={index}>
            {languageNames[lang as keyof typeof languageNames]}
          </DropdownButton>
        )
      })}
    </>
  )
}
