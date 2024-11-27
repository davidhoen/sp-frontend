const createNextIntlPlugin = require("next-intl/plugin")
const { version } = require("./package.json")

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "xsgames.co",
        port: ""
      }
    ]
  },
  env: {
    version
  }
}

module.exports = withNextIntl(nextConfig)
