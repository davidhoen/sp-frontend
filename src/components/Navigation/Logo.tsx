import { cn } from "@/lib/utils"
import Image from "next/image"

const Logo = ({ type = "default", className, ...props }: { type?: "default" | "withTagline", className?: string }) => {
  const filePath = type === "default" ? "/windesheim_logo.svg" : "/windesheim_logo_tagline.svg"
  return (
    <figure className={cn("w-full", className)}>
      <Image src={filePath} width={128} height={78} alt="Logo Windesheim" {...props} />
    </figure>
  )
}

export default Logo
