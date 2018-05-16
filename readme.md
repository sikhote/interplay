[![Circle CI](https://img.shields.io/circleci/project/sikhote/interplay.app/master.svg)](https://circleci.com/gh/sikhote/interplay.app)
[![Dependency Status](https://david-dm.org/sikhote/interplay.app.svg)](https://david-dm.org/sikhote/interplay.app)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# interplay.app
play media from the cloud on a browser

## notes
- Built with React, Next.js, and more
- Deploys static files to AWS S3 using CircleCI and Serverless
- So far, only Dropbox is supported and it requires an access token

## commands
- `yarn watch` to set environment and build and watch
- `yarn export` to build and export static files
- `yarn prettier` to clean your code
- `yarn eslint` to check your code is clean
- `yarn server` to start a simple server from a build
