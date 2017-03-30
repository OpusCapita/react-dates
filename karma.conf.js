'use strict'

let webpack = require('webpack');
let rules = require('./webpack.development.config.js').module.rules;
let chai = require('chai');
let chaiEnzyme = require('chai-enzyme');
chai.use(chaiEnzyme());

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },
    singleRun: true,
    frameworks: [ 'mocha', 'chai' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack' ]
    },
    reporters: [ 'mocha' ],
    mochaReporter: {
      showDiff: true
    },
    webpack: {
      module: {
        rules: rules
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
}
