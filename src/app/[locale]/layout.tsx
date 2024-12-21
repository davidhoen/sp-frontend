import { routing } from "@/i18n/routing"
import type { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Roboto, Roboto_Slab } from "next/font/google"
import { notFound } from "next/navigation"
import "./globals.css"
import { Toaster } from 'react-hot-toast';
import ParentProvider from "@/providers/ParentProvider"

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"]
})
const robotoSlab = Roboto_Slab({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--roboto-slab"
})

// Fix input zoom for safari browsers
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

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

export default async function RootLayout(props: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

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
        <NextIntlClientProvider messages={messages}>
          <ParentProvider>
            <main>{children}</main>
          </ParentProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
