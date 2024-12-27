import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import Image from "next/image"

const Logo = ({ className, ...props }: { className?: string }) => {
  return (
    <Link href={"/"}>
      <figure className={cn("w-full", className)}>
        <Image src={"/skills-passport-logo-with-name.svg"} width={130} height={65} alt="Logo skills passport" {...props} />
      </figure>
    </Link>
  )
}

export default Logo
