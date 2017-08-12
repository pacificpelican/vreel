# [vreel](http://vreel.pacificio.com)

## by Dan McKeown

### https://djmblog.com

...

## Table Of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Known Issues](#knownIssues)
- [License](#license)

## features

This project provides the following features:

- Upload videos
    - Rename copied video file using user input plus random hash [saved as .mov file type]
    - Add video information, including file name, using via [LokiJS](http://lokijs.org/) [a [MongoDB](https://www.mongodb.com/)-style database that persists to JSON] to vspotindex.json
    - Video files are saved to /public directory inside app directory
    
- View videos
    - Playable latest video is shown in middle of home page
    - Twenty next most recent videos are shown in column on right
    - Clicking on video launches /thisvideo/<video-name> page with video player

## QuickStart
1. Do the installation steps on your Mac's terminal
2. Upload videos from your computer

## requirements
- [NodeJS](https://nodejs.org)
- [NPM](https://www.npmjs.com/)

## installation
1. Clone the project: `git clone <project-URL-here>`
2. Build and serve: `npm install && npm run vreel`
3. Visit the site: `http://localhost:3000`

## usage
- vreel is designed to be a video file archiver
- metadata about the video (name, description, year, actor 1, actor 2) is optional but it is recommended as it is added to the [JSON-file-based MongoDB-like LokiJS] database

## knownIssues
- random-ish hash added to file names does not roll until app restarts
- all files have file ending stripped and have .mov appended regardless of type
- all files are asssumed by app to be videos; behavior when uploading other files untested
- no accounts or security to speak of--currently targeting personal installs via command line + Chrome; or [Electron](https://electron.atom.io/) or [NWJS](https://nwjs.io/) packages

## license

vreel is copyright (c) 2017 [Dan McKeown](http://danmckeown.info)

Licensed under [ISC License](https://opensource.org/licenses/ISC)

-
### builtWith

- [NodeJS](https://nodejs.org)
- [ExpressJS](https://expressjs.com/)
- [Webpack](https://webpack.github.io)
- [LokiJS](http://lokijs.org/)
- [Preact](https://github.com/developit/preact)
- [preact-compat](https://github.com/developit/preact-compat)
- [preact-boilerplate](https://github.com/developit/preact-boilerplate)
