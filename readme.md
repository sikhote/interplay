[![CircleCI Build Status](https://img.shields.io/circleci/project/github/sikhote/interplay.app/master.svg?label=CircleCI)](https://circleci.com/gh/sikhote/interplay.app)
[![Dependency Status](https://david-dm.org/sikhote/interplay.app.svg)](https://david-dm.org/sikhote/interplay.app)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)

# interplay.app
Play media from the cloud on a browser

## notes
- Built with React, Next.js, and more
- Deploys static files to AWS S3 using CircleCI and Serverless
- So far, only Dropbox is supported and it requires an access token

## commands
- `yarn dev` to develop
- `yarn build` to build for production
- `yarn start` to run in production mode
- `yarn xo` to check code is clean
