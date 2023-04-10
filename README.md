# Git Flow Test Repo

Using this repo to develop a git flow based setup

## Process

This projects' development process loosely follows git-flow by (Vincent Driessen)[http://nvie.com/]. Feature development happens on the `dev` branch, however features don't get their own feature branch, due to the lack of contribution complexity at the moment.

External PRs should therefore target the dev branch. This will trigger unit tests, which need to pass, in order for merging to be considered.

Version bumps only happen on the `dev` branch, initiated through the `Version Bump` workflow. This will create a new major, minor or patch release on the `nightly` release train. Every push to the `dev` branch will trigger a deployment to the docker `nightly` tag. 

Once enough changes are ready for deployment, a PR to the main branch needs to be opened for a complete suite of checks to pass. To automate this, together with the appropriate version bump, execute the `beta_release` action. The same holds true for production releases through the `production_release` action.

Before accepting the PR the following checks are enforced through branch protection rules:
- Full build process
- Unit tests
- API tests
- Docker E2E tests

Every push leads to a deployment to the appropriate `beta` or `production` channel, based on the current version of the application. Both will lead to a release and tag.