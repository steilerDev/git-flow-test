# Git Flow Test Repo

Using this repo to develop a git flow based setup

## Process

This projects' development process loosely follows git-flow by (Vincent Driessen)[http://nvie.com/]. Feature development happens on the `dev` branch, however features don't get their own feature branch, due to the lack of contribution complexity at the moment.

External PRs should therefore target the dev branch. This will trigger unit tests, which need to pass, in order for merging to be considered.

Version bumps only happen on the `dev` branch, initiated through the `Version Bump` workflow. This will create a new major, minor or patch release on the `nightly` release train. Every push to the dev branch will trigger a deployment to the `nightly` docker tag.

Once enough changes are ready for deployment, a PR to the main branch needs to be opened for a complete suite of checks to pass. Those include:
- Full build process
- Unit tests
- API tests
- Docker E2E tests

These checks need to pass in order to allow pushes to the `main` branch. This will lead to a version bump to the `beta` channel and following deployments. Every subsequent push to the `main` branch will increment the current beta version.

Final release will be initiated by running `Release` workflow, which will push a release tag, create a release and push relevant deployments.