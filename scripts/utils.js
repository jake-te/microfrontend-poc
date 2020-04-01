const childProcess = require('child_process');
const os = require('os');

module.exports = {
    minikubeKubectl,
    runWithMinikubeDocker,
    executeCommand,
}


// Uses minikube's kubectl
function minikubeKubectl(command) {
    return executeCommand(`minikube kubectl -- ${command}`);
}

function runWithMinikubeDocker(command) {
    const setDockerToMinikubeContext = isWindows() ? `& minikube -p minikube docker-env | Invoke-Expression`
                                                   : 'eval $(minikube docker-env)';

    const setEnv = isWindows()  ? `$Env:mode="production"`
                                : 'mode="production"';

    return executeCommand(`${setEnv}; ${setDockerToMinikubeContext}; ${command}`);
}

function isWindows() {
    return os.type() === 'Windows_NT';
}


async function executeCommand(command) {
    const options = isWindows() ? { shell: 'powershell' } : undefined;
    return new Promise((resolve, reject) => childProcess.exec(command, options, (error, stdin, stderr) => {
        if (error) {
            reject(error);
        }
        else {
            console.log(stdin);
            resolve(stdin);
        }
    }));
}
