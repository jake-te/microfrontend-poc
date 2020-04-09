// Note: Requires
// - minikube with ingress addon installed
// - kubectl with valid context 'minikube'

const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');

// minikube delete
// minikube start

// TODO: Prob doesn't work
const command = isWindows() ? '& minikube -p minikube docker-env | Invoke-Expression'
                            : 'eval $(minikube docker-env)';

childProcess.execSync(command);

// TODO:
// 1) Build working docker image for each locally, make sure it serves what we want
// 2) Add commands here for building those in minikube

// build each image in docker
// docker build -t nodejs-server .


// Clear out minikube environment
kubectl('delete deployments --all');
kubectl('delete ingress --all');
kubectl('delete svc --all');

// TODO: Generalize this
// Create k8s objects
applyK8sFiles('./endpoint-agent/k8s')
applyK8sFiles('./webapps/k8s')


function applyK8sFiles(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        kubectl(`apply -f ${directory}/${file}`);
    }

}
function kubectl(command) {
    childProcess.execSync(`kubectl --context minikube ${command}`);
}

function isWindows() {
    return os.type() === 'Windows_NT';
}
