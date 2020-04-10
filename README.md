# microfrontend-poc
A proof of concept for how to separate out frontend services by domain such that:
- They're decoupled and can be developed independently (single owning team)
- They can be deployed independently
- Both frontend and backend code for a given domain's lives together

## Testing the project
1. Run `npm install` in the `webapps` and `endpoint-agent` directories
2. Run `npm run serve` in the `webapps` directory
3. Run `npm run serve` in the `endpoint-agent` directory
4. Navigate to `localhost:1111` for `webapps` and `localhost:2222` for `endpoint-agent`.
  Observe that the same web component is used in both places, and that fetching data from the `endpoint-agent` server works in both contexts.

## Setting up Minikube environment
1. npm install in `.`, `./webapps` and `./endpoint-agent`
2. Set endpoint.microfrontend and app.microfrontend to resolve to minikube ip
  - e.g. Get ip from `minikube ip`, add to /etc/hosts file: `MINIKUBE_IP endpoint.microfrontend app.microfrontend`
3. Run `node setupMinikube.js` with admin privileges
  - This will modify your minikube environment and take a few minutes to complete
4. Open `http://app.microfrontend` in the browser


## TODO
- Add canary deployment logic (Cookie per domain etc)
- Update fetch etc calls to change based on build context (point to right host)
- Create vue component that will override `a` and `script` etc to update relative links to point to correct domains
- Update UI to be more illustrative of what's happening
- Add component within team page example
