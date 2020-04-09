const childProcess = require('child_process');
const gitUtils = require('./gitUtils');

const staticAssetsBuildDir = `dist/public/${gitUtils.getCurrentShortGitRevision()}/static`;
childProcess.execSync(`npx vue-cli-service build --filename endpointAgent --dest ${staticAssetsBuildDir} --mode development --target lib --formats umd --inline-vue --no-clean ./src/client/main.js && npx rimraf ${staticAssetsBuildDir}/demo.html`);
