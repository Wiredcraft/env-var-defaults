'use strict';

const env = require('env-var');

const lib = require('..');
const builder = lib.builder;

function injected() {
  const defaults = lib.builder.apply(lib, arguments);
  const body = 'return function(name, values) { return get(name, defaults(values)) }';
  env.get = new Function('get', 'defaults', body)(env.get, defaults);
  return env;
}

module.exports = injected;
