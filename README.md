[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Wildflower](./logo.png)

# Project wildflower

>There's Beauty in this beast


## Project goal

To create a MOBA game in the browser using Typescript, BABYLONjs and SignalR.

## Usage

Use `webpack` to compile the code into a bundle.js file.

user `npm run test` or `karma start` to run unit tests (more on this later).

user npm run serve to start the small testing server.

### File layout

The source (.ts and .ejs) files are found in the `source` folder, this is where development takes place.

Unit test files can be fouund in `test`.

### Webpack configuration

Webpack is configure to transpile the typescript files and its dependencies into one file called bundle.js.

This file can be fouund in `lib/static/bundle/js`.

A map is also included for easier debugging on the test server.

Webpack also compiles the html webpage into the `lib` folder. 

### Test configuration

Tests can be found at `test`. 

The testing framework is `Mocha`, the assertion framework is `chai` with a little bit of `sinon` and `chai-as-promised` mixed in for good measure.

### Test server configuration

So I was getting frustrated with the restrictiveness of Test driven development (TDD), I constantly had compatibility issues ... To name a few, JSDOM not working with webpack, no access to the document window, PhantomJS not supporting WebGL this list goes on. I ended up spending more time trying to get the test environment set up then I did actually writing the tests, and basically I had no code written as a result. In short, it made development a real pain.

Since this is meant to be a fun side hobby, I no longer do TDD but instead use the good old "build it and see" method. This required me to have a test server. Its a real lightweight that uses express.js to do the meat of the work. It can be found in the `server` folder. Here you have the server.js file and a folder to hold the mock data. The urls and the server responses are added as and when needed.

