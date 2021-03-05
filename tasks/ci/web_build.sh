#!/usr/bin/env bash

set -euo pipefail

pushd web
npm set //npm.pkg.github.com/:_authToken ${GITHUB_TOKEN}
yarn install --silent
yarn typecheck
yarn lint
yarn build
popd
