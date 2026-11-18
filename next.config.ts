import type { NextConfig } from 'next'

// GitHub Pages project sites are served from /<repo-name>/. Dev stays at the root.
const REPO_NAME = 'modern-hotel-design'
const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? `/${REPO_NAME}` : '',
  assetPrefix: isProd ? `/${REPO_NAME}/` : undefined,
  env: { NEXT_PUBLIC_BASE_PATH: isProd ? `/${REPO_NAME}` : '' },
}

export default nextConfig
