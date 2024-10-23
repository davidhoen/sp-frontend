import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

// When a new locale is added, make sure to add a language name as well.
export const locales = ["en", "nl"]

export const languageNames = {
  "en": "English",
  "nl": "Nederlands"
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: locales[0]
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
