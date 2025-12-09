const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const BACKEND_CONTAINER_NAME =
  process.env.NEXT_PUBLIC_BACKEND_CONTAINER_NAME || "backend"

const payloadUrl =
  process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || "http://payload:3000"
const payloadPattern = {
  protocol: payloadUrl.startsWith("https") ? "https" : "http",
  hostname: payloadUrl.split("://")[1].split(":")[0],
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      payloadPattern,
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: BACKEND_CONTAINER_NAME,
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(S3_HOSTNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
            },
          ]
        : []),
    ],
  },
}

module.exports = nextConfig
