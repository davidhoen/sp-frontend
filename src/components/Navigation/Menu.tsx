"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserType } from "@/types/User"
import { BellIcon, MenuIcon } from "lucide-react"
import UserProfile from "./UserProfile"

export default function Menu({ user }: { user: UserType }) {
  const userName = "John Doe"
  const notificationCount = 3

  const userInitials = userName
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase()

  const menuItems = [
    { name: "Dashboard", href: "#" },
    { name: "My Skills Groups", href: "#" },
    { name: "Public Profile", href: "#" },
    { name: "Competences", href: "#" },
    { name: "Profiles", href: "#" }
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  {/* Logo space in drawer */}
                  <div className="h-16 flex items-center justify-center border-b">
                    <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="Logo" />
                  </div>
                  {/* Menu items */}
                  <div className="flex-grow py-4">
                    {menuItems.map(item => (
                      <a key={item.name} href={item.href} className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        {item.name}
                      </a>
                    ))}
                  </div>
                  {/* User profile in drawer */}
                  <div className="border-t py-4 flex flex-col items-center px-4 justify-center text-muted-foreground">
                    <div>Skills Passport</div>
                    <div className="text-sm">{process.env.version}</div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          {/* <div className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="Logo" />
          </div> */}

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="flex space-x-4">
              {menuItems.map(item => (
                <a key={item.name} href={item.href} className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* User profile and notifications */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" aria-label={`${notificationCount} notifications`}>
              <BellIcon className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {notificationCount}
                </span>
              )}
            </Button>
            <UserProfile user={user} />
          </div>
        </div>
      </div>
    </nav>
  )
}
