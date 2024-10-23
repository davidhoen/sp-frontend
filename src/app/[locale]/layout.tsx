import type { Metadata } from "next"
import { Roboto, Roboto_Slab } from "next/font/google"
import "./globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import Head from "next/head"

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"]
})
const robotoSlab = Roboto_Slab({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--roboto-slab"
})

export const metadata: Metadata = {
  title: "Skills Passport",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        media: "(prefers-color-scheme: light)"
      },
      {
        url: "/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)"
      }
    ]
  }
}

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${roboto.className} ${robotoSlab.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
