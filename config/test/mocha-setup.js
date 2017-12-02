import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

/*
   "Warning: React depends on requestAnimationFrame.
   Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills"
*/
global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 16);
};

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};

global.self = global.window;


copyProps(window, global);

var chai = require('chai');

chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme'));

Enzyme.configure({ adapter: new Adapter() });
