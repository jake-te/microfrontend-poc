const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');

console.log('Installing npm dependencies...')
// executeCommand('npm --prefix ./webapps i')
// executeCommand('npm --prefix ./endpoint-agent i')

console.log('Minikube - Enabling ingress addon...')
executeCommand('minikube addons enable ingress');

// TODO: Use ingress DNS addon?

console.log('Minikube - Deleting preexisting k8s objects...')
minikubeKubectl('delete deployments --all');
minikubeKubectl('delete ingress --all');
minikubeKubectl('delete svc --all');

console.log('Minikube - Building app images...');
runWithMinikubeDocker('npm --prefix ./webapps run build.image')
runWithMinikubeDocker('npm --prefix ./endpoint-agent run build.image')

console.log('Minikube - Setting up all k8s objects...');
applyK8sFiles('./endpoint-agent/k8s')
applyK8sFiles('./webapps/k8s')


function applyK8sFiles(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        minikubeKubectl(`apply -f ${directory}/${file}`);
    }
}

// Uses minikube's kubectl
function minikubeKubectl(command) {
    return executeCommand(`minikube kubectl -- ${command}`);
}

function runWithMinikubeDocker(command) {
    // `@FOR /f "tokens=*" %i IN ('minikube -p minikube docker-env') DO @%i`
    const setDockerToMinikubeContext = isWindows() ? `& minikube -p minikube docker-env | Invoke-Expression`
                                                   : 'eval $(minikube docker-env)';

    return executeCommand(`${setDockerToMinikubeContext}; ${command}`);
}

function isWindows() {
    return os.type() === 'Windows_NT';
}


function executeCommand(command) {
    const options = isWindows() ? { shell: 'powershell' } : undefined;
    return childProcess.execSync(command, options)
}
