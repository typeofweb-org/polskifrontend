const withImages = require('next-images');
const config = withImages();

config.reactStrictMode = true;
config.poweredByHeader = false;

module.exports = config;
