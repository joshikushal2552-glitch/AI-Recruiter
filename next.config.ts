import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse', 'pg', '@prisma/adapter-pg'],
}

export default nextConfig
