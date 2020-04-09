const childProcess = require('child_process');

const staticAssetsBuildDir = `dist/public`;
childProcess.execSync(`npx vue-cli-service build --filename webapps --dest ${staticAssetsBuildDir} --mode development --inline-vue --no-clean ./src/client/main.js && npx rimraf ${staticAssetsBuildDir}/demo.html`);
