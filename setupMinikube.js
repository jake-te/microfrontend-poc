const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');

setupMinikubeEnvironment();


async function setupMinikubeEnvironment() {
    // TODO: Bugged, get this to work
    // console.log('Installing npm dependencies...')
    // executeCommand('npm --prefix ./webapps install')
    // executeCommand('npm --prefix ./endpoint install')

    console.log('Minikube - Enabling ingress addon...')
    await executeCommand('minikube addons enable ingress');

    // TODO: Use ingress DNS addon?

    console.log('Minikube - Deleting preexisting k8s objects...')
    await Promise.all([
        minikubeKubectl('delete deployments --all'),
        minikubeKubectl('delete ingress --all'),
        minikubeKubectl('delete svc --all'),
    ])


    console.log('Minikube - Building app images...');
    await Promise.all([
        runWithMinikubeDocker('npm --prefix ./webapps run build.image'),
        runWithMinikubeDocker('npm --prefix ./endpoint run build.image')
    ])


    console.log('Minikube - Setting up all k8s objects...');
    await Promise.all([
        minikubeKubectl(`apply -f ./endpoint/k8s -R`),
        minikubeKubectl(`apply -f ./webapps/k8s -R`)
    ])

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
