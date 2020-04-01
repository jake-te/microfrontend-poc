const childProcess = require('child_process');
const gitUtils = require('../common/gitUtils');

buildComponent('revenue', './src/page/main.js');
buildComponent('pricingCalculator', './src/component/main.js')

function buildComponent(outputName, srcPath) {
    const mode = process.env.mode || 'development';
    const staticAssetsBuildDir = `dist/public/${gitUtils.getCurrentShortGitRevision()}/static`;
    childProcess.execSync(`npx vue-cli-service build --mode "${mode}" --name ${outputName} --filename ${outputName} --dest ${staticAssetsBuildDir} --target lib --formats umd --inline-vue --no-clean ${srcPath} && npx rimraf ${staticAssetsBuildDir}/demo.html`, { stdio: 'inherit' });
}
