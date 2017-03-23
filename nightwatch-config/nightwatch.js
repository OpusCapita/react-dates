'use strict';

let SCREENSHOTS_PATH = './screenshots';

let SELENIUM = {
  log_path : './logs',
  host: process.env.SELENIUM_GRID_HOST || '127.0.0.1',
  port: process.env.SELENIUM_GRID_PORT || 4444
};

let BROWSER_OPTIONS = {
  javascriptEnabled: true,
  acceptSslCerts: true,
  screenshots: {
    enabled: true,
    path: SCREENSHOTS_PATH
  }
};

let BROWSERS = {
  FIREFOX: Object.assign({}, BROWSER_OPTIONS, { browserName: 'firefox' }),
  CHROME: Object.assign({}, BROWSER_OPTIONS, { browserName: 'chrome' }),
  EDGE: Object.assign({}, BROWSER_OPTIONS, { browserName: 'MicrosoftEdge' }),
  IE11: Object.assign({}, BROWSER_OPTIONS, { browserName: 'IE11' })
};

let ENVIRONMENTS = {
  default: {
    desiredCapabilities: BROWSERS.FIREFOX
  },
  firefox: {
    desiredCapabilities: BROWSERS.FIREFOX
  },
  chrome: {
    desiredCapabilities: BROWSERS.CHROME
  },
  edge: {
    desiredCapabilities: BROWSERS.EDGE
  },
  ie11: {
    desiredCapabilities: BROWSERS.IE11
  }
};

module.exports = {
  src_folders: ['tests'],
  selenium: SELENIUM,
  test_settings: ENVIRONMENTS
};
