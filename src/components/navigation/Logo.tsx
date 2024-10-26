import Image from "next/image"

const Logo = ({ type = "default", ...props }: { type?: "default" | "withTagline" }) => {
  const filePath = type === "default" ? "/windesheim_logo.svg" : "/windesheim_logo_tagline.svg"
  return (
    <figure className="w-full">
      <Image src={filePath} width={128} height={78} alt="Logo Windesheim" {...props} />
    </figure>
  )
}

export default Logo
