const childProcess = require('child_process');

childProcess.execSync('vue-cli-service build --filename endpointAgent --dest ./public --mode development --target lib --formats umd --inline-vue --no-clean ./src/main.js && rm ./public/demo.html');
