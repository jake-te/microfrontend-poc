# microfrontend-poc
A proof of concept for how to separate out frontend services by domain such that:
- They're decoupled and can be deployed and developed independently by a single owning team

## Setup
  - Run `npm install` in the `webapps`, `endpoint`, and `revenue` directories
  - Install minikube using a driver that supports the ingress addon

## Running Locally
1. Complete setup steps above
2. Run `npm run serve` in the `webapps` directory
3. Run `npm run serve` in the `endpoint` directory
4. Run `npm run serve` in the `revenue` directory
5. Open `localhost:1111` in the browser

## Setting up Minikube environment
1. Complete setup steps above
2. Configure `app.microfrontend` to resolve to minikube ip
    - e.g. Get ip from `minikube ip`, add to /etc/hosts file: `MINIKUBE_IP app.microfrontend`
3. Run `npm run serve.k8s` from root folder with admin privileges
  - This will modify your minikube environment and take a few minutes to complete
4. Open `http://app.microfrontend` in the browser

## Notes
- To override server address: `localStorage.setItem('@te/endpoint/url', 'http://localhost:2222')`
  - TODO: Think through and document flexible namespacing scheme

## TODO
- Create vue component that will override `a` and `script` etc to update relative links to point to correct domains
- Define build process for pulling in team names etc. e.g. hardcoded page endpoints
- TODO: Clean up env vars between vue/server build
