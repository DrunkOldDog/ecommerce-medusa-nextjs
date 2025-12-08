import { withPayload } from '@payloadcms/next/withPayload'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.S3_ENDPOINT || '',
      }
    ]
  }
}

export default withPayload(nextConfig)
