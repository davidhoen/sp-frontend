import { Link } from "@/i18n/routing"
import { LinkProps } from "next/link"
import React, { ReactNode } from "react"

interface NavLinkProps extends LinkProps {
  active?: boolean
  children: ReactNode
}

const NavLink = ({ active = false, href, children, ...props }: NavLinkProps) => (
  <Link
    href={href}
    {...props}
    locale={props.locale === false ? undefined : props.locale}
    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
      active ? "border-indigo-400 text-gray-900 focus:border-indigo-700" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
    }`}>
    {children}
  </Link>
)

export default NavLink
