const withImages = require('next-images');
const config = withImages();

config.reactStrictMode = true;
config.poweredByHeader = false;
config.redirects = async () => {
  return [
    {
      source: '/',
      destination: '/grid',
      permanent: true,
    },
  ];
};

config.target = 'serverless';

module.exports = config;
