// @ts-check

// const { VERCEL_GITHUB_COMMIT_SHA, VERCEL_GITLAB_COMMIT_SHA, VERCEL_BITBUCKET_COMMIT_SHA, ANALYZE } =
//   process.env;

// const COMMIT_SHA =
//   VERCEL_GITHUB_COMMIT_SHA || VERCEL_GITLAB_COMMIT_SHA || VERCEL_BITBUCKET_COMMIT_SHA;

const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/grid/',
      },
      {
        source: '/feed',
        destination: '/api/feed',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  experimental: {
    appDir: true,
  },
  productionBrowserSourceMaps: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  eslint: {
    dirs: ['.'],
  },
};

module.exports = config;
