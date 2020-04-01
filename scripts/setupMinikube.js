const { minikubeKubectl, runWithMinikubeDocker, executeCommand }  = require('./utils');

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
        runWithMinikubeDocker('npm --prefix ./endpoint run build.image'),
        runWithMinikubeDocker('npm --prefix ./revenue run build.image'),
    ])


    console.log('Minikube - Setting up all k8s objects...');
    await Promise.all([
        minikubeKubectl(`apply -f ./endpoint/k8s -R`),
        minikubeKubectl(`apply -f ./webapps/k8s -R`),
        minikubeKubectl(`apply -f ./revenue/k8s -R`),
    ])

}
