const childProcess = require('child_process');
const gitUtils = require('./gitUtils');

const mode = process.env.mode || 'development';
const staticAssetsBuildDir = `dist/public/${gitUtils.getCurrentShortGitRevision()}/static`;
childProcess.execSync(`npx vue-cli-service build --mode "${mode}" --filename endpointAgent --dest ${staticAssetsBuildDir} --target lib --formats umd --inline-vue --no-clean ./src/client/main.js && npx rimraf ${staticAssetsBuildDir}/demo.html`);
