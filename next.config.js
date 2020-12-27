const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = withBundleAnalyzer(withImages());

config.reactStrictMode = true;
config.poweredByHeader = false;

config.rewrites = async () => {
  return [
    {
      source: '/',
      destination: '/grid/',
    },
  ];
};

config.experimental = { optimizeImages: true, optimizeFonts: true };

module.exports = config;
