const childProcess = require('child_process');

const mode = process.env.mode || 'development';
childProcess.execSync(`npx vue-cli-service build --mode ${mode} --filename webapps --dest ./dist/public --inline-vue --no-clean ./src/client/main.js --modern && npx rimraf ./dist/public/demo.html`, { stdio: 'inherit' });
