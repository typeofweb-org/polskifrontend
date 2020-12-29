const clientGlobs = [
  {
    name: 'Client Bundles (main, webpack, commons)',
    globs: ['.next/static/runtime/+(main|webpack)-*', '.next/static/chunks/!(polyfills*)'],
  },
  {
    name: 'Legacy Client Bundles (polyfills)',
    globs: ['.next/static/chunks/+(polyfills)-*'],
  },
  {
    name: 'Client Pages',
    globs: ['.next/static/*/pages/**/*'],
  },
  {
    name: 'Client Build Manifests',
    globs: ['.next/static/*/_buildManifest*'],
  },
  {
    name: 'Rendered Page Sizes',
    globs: ['fetched-pages/**/*.html'],
  },
];

const renames = [
  {
    srcGlob: '.next/static/*/pages',
    dest: '.next/static/BUILD_ID/pages',
  },
  {
    srcGlob: '.next/static/runtime/main-*',
    dest: '.next/static/runtime/main-HASH.js',
  },
  {
    srcGlob: '.next/static/runtime/webpack-*',
    dest: '.next/static/runtime/webpack-HASH.js',
  },
  {
    srcGlob: '.next/static/runtime/polyfills-*',
    dest: '.next/static/runtime/polyfills-HASH.js',
  },
  {
    srcGlob: '.next/static/chunks/commons*',
    dest: '.next/static/chunks/commons.HASH.js',
  },
  {
    srcGlob: '.next/static/chunks/framework*',
    dest: '.next/static/chunks/framework.HASH.js',
  },
  // misc
  {
    srcGlob: '.next/static/*/_buildManifest.js',
    dest: '.next/static/BUILD_ID/_buildManifest.js',
  },
];

module.exports = {
  // the Heading to show at the top of stats comments
  commentHeading: 'Stats from current PR',
  commentReleaseHeading: 'Stats from current release',
  // the command to build the app (app source should be in `.stats-app`)
  appBuildCommand:
    'cp .env-sample .env && NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=$(yarn --silent heroku config:get DATABASE_URL -a polskifrontend)"?connection_limit=3" yarn next build',
  appStartCommand: 'NEXT_TELEMETRY_DISABLED=1 yarn next start --port $PORT',
  // the main branch to compare against (what PRs will be merging into)
  mainBranch: 'develop',
  // the main repository path (relative to https://github.com/)
  mainRepo: 'typeofweb/polskifrontend',
  // whether to attempt auto merging the main branch into PR before running stats
  autoMergeMain: false,
  // an array of configs for each run
  configs: [
    {
      // first run's config
      // title of the run
      title: 'App',
      // whether to diff the outputted files (default: onOutputChange)
      diff: 'onOutputChange',
      // renames to apply to make file names deterministic
      renames,
      // an array of file groups to diff/track
      filesToTrack: clientGlobs,
      // an array of URLs to fetch while `appStartCommand` is running
      // will be output to fetched-pages/${pathname}.html
      pagesToFetch: [
        'http://localhost:$PORT/',
        'http://localhost:$PORT/list',
        'http://localhost:$PORT/zglos-serwis',
      ],
    },
  ],
};
