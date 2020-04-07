# microfrontend-poc
A proof of concept for how to separate out frontend services by domain such that:
- They're decoupled and can be developed independently (single owning team)
- They can be deployed independently
- Both frontend and backend code for a given domain's lives together (no monolithic, "god" server)

## Testing the project
1. Run `npm install` in the `webapps` and `endpoint-agent` directories
2. Run `npm run serve` in the `webapps` directory
3. Run `npm run serve` in the `endpoint-agent` directory
4. Navigate to `localhost:1111` for `webapps` and `localhost:2222` for `endpoint-agent`.
  Observe that the same web component is used in both places, and that fetching data from the `endpoint-agent` server works in both contexts.


## TODO
- Initially navigating to localhost:1111/endpoint-agent causes request to be routed to endpoint-agent service. Problem
- We want any request for any url to localhost:1111 to initially load index.html of webapps, then process route
- Can we use Referer header? Is that robust? We expect Referer of initial request to not match base page

- Should we have different domain names for each service rather than use URL routing? Requires DNS changes
- Look at webapps: "checkReferer" - Seems we enforce Referer header there, so maybe it's safe to depend on?
- https://stackoverflow.com/questions/53718930/conditional-routing-with-nginx-based-on-referer
- TODO: read this: https://martinfowler.com/articles/micro-frontends.html
