# Git Flow Test Repo

Using this repo to develop a git flow based setup

## Conventional Commit

Using [Angular](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit) for commit messages.

## Process

This projects' development process loosely follows git-flow by (Vincent Driessen)[http://nvie.com/]. Feature development happens on the `dev` branch, however features don't get their own feature branch, due to the lack of contribution complexity at the moment.

External PRs should therefore target the dev branch. This will trigger unit tests, which need to pass, in order for merging to be considered. Every push to the `dev` branch will trigger a pre-release to the `nightly` channel on DockerHub and npm through [semantic-release](https://github.com/semantic-release/semantic-release).

Once the `dev` branch has reached a certain stage, changes can be staged for release on the `beta` channel. This happens through a Pull Request against the `beta` branch. This will trigger more thorough checks, including building all assets necessary for production release, as well as E2E and API tests. Once the pull request has been merged, [semantic release](https://github.com/semantic-release/semantic-release) will perform a release to the `beta` channel on DockerHub and npm.

In order to run a production release, a PR against the main branch is required - triggering the same sanity checks as the `beta` branch. After passing and merging, a production release will deploy the artifacts to DockerHub, npm and also update documentations.

Before merging the PR into `beta` or `main` the following checks are enforced through branch protection rules:
- Full build process
- Unit tests
- API tests
- Docker E2E tests

`beta` and `main` branch can only receive PRs - direct commits are disabled through branch protection rules

## Merging todos

Before merging this back into `icloud-photos-sync`, the following hardcoded references to `git-flow-test` need to be adjusted:
- `app/package.json`:
  - `repository.url`
  - `name`
- `.github/actions/release/github-release-config/.releaserc.json`
  - Name of packages

## Setup

- Secrets:
  - `NPM_TOKEN`: Token for releasing to npm, used by:
    - `[event] push` for releases to npm
  - `DOCKER_TOKEN` (needs to be 'read/write/delete'): Token for releasing to docker (assuming repo owner == docker username)
    - `[event] push` for releases

- Environments:
  - `dev`
    - Deployment branch: `dev`
  - `beta`
    - Deployment branch: `beta`
  - `production`
    - Deployment branch: `main`
- Branch protection rules:
  - `main` & `beta` branch:
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