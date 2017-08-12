# [vreel](http://vreel.pacificio.com)

<img src='vreellogo.png' alt="vReel reel-to-reel SVG logo" />

## by Dan McKeown

### https://djmblog.com

## Table Of Contents
- [Features](#features)
- [Design](#design)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [KnownIssues](#knownissues)
- [License](#license)
- [BuiltWith](#builtwith)

## features

This project provides the following features:

- Upload videos
    - Rename copied video file using user input plus random hash [saved as .mov file type]
    - Add video information, including file name, using via [LokiJS](http://lokijs.org/) [a [MongoDB](https://www.mongodb.com/)-like database that persists to JSON] to vspotindex.json
    - Video files are saved to /public directory inside app directory
    
- View videos
    - Playable latest video is shown in middle of home page
    - Twenty next most recent videos [with year metadata > 2000] are shown in column on the left
    - Clicking on video launches /thisvideo/<video-name> page with video player
    - Each video has a perma-link

## QuickStart
1. Do the installation steps on your system's terminal
2. Upload videos from your computer

## design
- vreel is built with [ReactJS](https://facebook.github.io/react/) components (the project actually uses [Preact](https://preactjs.com/) in React comptability mode) which make up the front-end of the project
- the layout uses [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- the videos are served from the ExpressJS server, and due to the prohibitive cost of streaming large files through NodeJS, the video perma-link web pages are served directly by the Express server instead of by the (compiled) React components via RESTful APIs like the for rest of the site's functionality
- the latest video uses an iframe to serve the video via Express
- the left column uses DOM storage to save info on what video links to put i the list, and since DOM operations like that are async there is a refresh button there
- API calls to the backend are done by the [Axios](https://github.com/mzabriskie/axios) library

## requirements
- Mac, Linux or Windows computer or server
- [NodeJS](https://nodejs.org) and [NPM](https://www.npmjs.com/)

## installation
1. Clone the project: `git clone https://github.com/pacificpelican/vreel.git`
2. Build: `npm install`
3. Serve the site:  `npm run vreel`
4. Visit the site in a browser: `http://localhost:3000`

## usage
- vreel is designed to be a video file archiver
- metadata about the video (name, description, year, actor 1, actor 2) is optional but it is recommended as it is added to the [JSON-file-based MongoDB-like LokiJS] database

## KnownIssues
- video list will only populate with movies that have a year and when it is later than 2000
- random-ish hash added to file names does not roll until app restarts
- all files have file ending stripped and have .mov appended regardless of type
- all files are asssumed by app to be videos; behavior when uploading other files untested
- no accounts or security to speak of--currently targeting personal installs via command line + Chrome; or [Electron](https://electron.atom.io/) or [NWJS](https://nwjs.io/) packages

## license

vreel is copyright (c) 2017 [Dan McKeown](http://danmckeown.info)

[Licensed](LICENSE.md) under [ISC License](https://opensource.org/licenses/ISC)

## BuiltWith

- [NodeJS](https://nodejs.org)
- [ExpressJS](https://expressjs.com/)
- [Webpack](https://webpack.github.io)
- [LokiJS](http://lokijs.org/)
- [Preact](https://github.com/developit/preact)
- [preact-compat](https://github.com/developit/preact-compat)
- [preact-boilerplate](https://github.com/developit/preact-boilerplate)
