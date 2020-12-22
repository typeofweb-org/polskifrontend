const withImages = require('next-images');
const config = withImages();

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

module.exports = config;
