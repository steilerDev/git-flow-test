# Git Flow Test Repo

Using this repo to develop a git flow based setup

## Conventional Commit

Using [Angular preset](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) with their [commit rules](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format)

## Process

This projects' development process loosely follows git-flow by (Vincent Driessen)[http://nvie.com/]. Feature development happens on the `dev` branch, however features don't get their own feature branch, due to the lack of contribution complexity at the moment.

External PRs should therefore target the dev branch. This will trigger unit tests, which need to pass, in order for merging to be considered.

Version bumps only happen on the `dev` branch, initiated through the [`[action] bump release`](https://github.com/steilerDev/git-flow-test/actions/workflows/action_bump-release.yml) workflow, by selecting `nightly-major`, `nightly-major`, or `nightly-patch`. 

This will create a new major, minor or patch release on the `nightly` release train. Once enough changes are ready for deployment, a PR to the main branch needs to be opened for a complete suite of checks to pass. To automate this, together with the appropriate version bump, execute the [`[action] bump release`](https://github.com/steilerDev/git-flow-test/actions/workflows/action_bump-release.yml) workflow, selecting the `beta`release bump type. Production releases are created in the same way, by selection the `production` type.

Before merging the PR into `main` the following checks are enforced through branch protection rules:
- Full build process
- Unit tests
- API tests
- Docker E2E tests

Every push to the `dev` branch containing a `nightly` release version leads to a `nightly` deployment. Every non-tag push to the `main` branch leads to a `beta` or `production` release, based on the triggering app version.

## Setup

- Environments:
  - `nightly`
    - Deployment branch: `dev`
    - `DOCKER_TOKEN` (with deployment access to a user with the same username as this repo's owner)
  - `beta`
    - Deployment branch: `main`
    - `DOCKER_TOKEN` (with deployment access to a user with the same username as this repo's owner)
    - `NPM_TOKEN` (with deployment access)
  - `production`
    - Deployment branch: `main`
    - Required reviewer: `steilerDev`
    - Do not let admins overwrite protection rules
    - `DOCKER_TOKEN` (with deployment access to a user with the same username as this repo's owner)
    - `NPM_TOKEN` (with deployment access)
- Branch protection rules:
  - `main` branch:
    - Require a pull request before merging
    - Require status checks to pass before merging
      - `build-artifacts / changelog`
      - `build-artifacts / app`
      - `build-artifacts / docker`
      - `build-artifacts / docs`
      - `build-artifacts / wiki`
      - `test-artifacts / unit`
      - `test-artifacts / e2e`
- Repository Secrets:
  - `TEST_APPLE_ID_USER`
  - `TEST_APPLE_ID_PWD`
  - `TEST_TRUST_TOKEN`
  - `GH_ACCESS_TOKEN` (for version bump workflow)