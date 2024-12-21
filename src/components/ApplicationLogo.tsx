import Image from "next/image";

const ApplicationLogo = ({ ...props }) => (
  <Image src="/skills-passport-logo.svg" alt="Skills Passport Logo" width={40} height={40} {...props} />
)

export default ApplicationLogo
