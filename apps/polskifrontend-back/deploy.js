import path from 'path';
import fetch from 'node-fetch';
import { spawn } from './lib/cp';
import { makeDir } from './lib/fs';
import npmRunScript from 'npm-run-script';

// Heroku
const remote = {
  name: 'heroku',
  url: 'https://git.heroku.com/polskifront-back-deploy-test.git',
  branch: 'master',
  website: 'https://polskifront-back-deploy-test.herokuapp.com',
};

const options = {
  cwd: path.resolve(__dirname, './dist'),
  stdio: ['ignore', 'inherit', 'inherit'],
};

/**
 * Deploy the contents of the `/build` folder to a remote server via Git.
 */
async function deploy() {
  // Initialize a new repository
  await makeDir('dist');
  await spawn('git', ['init', '--quiet'], options);

  // Changing a remote's URL
  let isRemoteExists = false;
  try {
    await spawn('git', ['config', '--get', `remote.${remote.name}.url`], options);
    isRemoteExists = true;
  } catch (error) {
    /* skip */
  }
  await spawn('git', ['remote', isRemoteExists ? 'set-url' : 'add', remote.name, remote.url], options);

  // Fetch the remote repository if it exists
  let isRefExists = false;
  try {
    await spawn('git', ['ls-remote', '--quiet', '--exit-code', remote.url, remote.branch], options);
    isRefExists = true;
  } catch (error) {
    await spawn('git', ['update-ref', '-d', 'HEAD'], options);
  }
  if (isRefExists) {
    await spawn('git', ['fetch', remote.name], options);
    await spawn('git', ['reset', `${remote.name}/${remote.branch}`, '--hard'], options);
    await spawn('git', ['clean', '--force'], options);
  }

  // Build the project in RELEASE mode which
  // generates optimized and minimized bundles
  await runScript();

  // Push the contents of the build folder to the remote server via Git
  await spawn('git', ['add', '.', '--all'], options);
  try {
    await spawn('git', ['diff', '--cached', '--exit-code', '--quiet'], options);
  } catch (error) {
    await spawn('git', ['commit', '--message', `Update ${new Date().toISOString()}`], options);
  }
  await spawn('git', ['push', remote.name, `master:${remote.branch}`, '--set-upstream'], options);

  // Check if the site was successfully deployed
  const response = await fetch(remote.website);
  console.log(`${remote.website} => ${response.status} ${response.statusText}`);;
}

async function runScript() {
  return new Promise(resolve => {
    const child = npmRunScript('npm run build && npm run copy');

    child.once('exit', () => {
      resolve();
    });
  });
}

export default deploy;
