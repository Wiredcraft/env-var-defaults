'use strict';

const env = require('env-var');

const DEFAULT_ENV_LIST = ['test', 'development', 'staging', 'production'];
const DEFAULT_ENV_NAME = 'NODE_ENV';
const DEFAULT_ENV = 'development';

/**
 * Build a default value getter.
 *
 * @param {Array} envList the list of supported NODE_ENV, default to `['test', 'development', 'staging', 'production']`
 * @param {String} envName you can use a different variable name for your `NODE_ENV` if you want
 * @return {Function} the builder
 */
function builder(envList, envName) {
  if (envList == null) {
    envList = DEFAULT_ENV_LIST;
  }
  if (envName == null) {
    envName = DEFAULT_ENV_NAME;
  }
  if (!Array.isArray(envList)) {
    throw new Error('envList must be an array');
  }
  if (typeof envName !== 'string') {
    throw new Error('envName must be a string');
  }

  // .
  const index = envList.indexOf(env.get(envName, DEFAULT_ENV).required().asString());

  /**
   * .
   */
  // return function defaults(obj) {
  //   return 'object' !== typeof obj ? obj : obj[index];
  // };
  let body;
  if (index < 0) {
    body = 'return function defaults() {}';
  } else {
    body = `return function defaults(obj) { return 'object' !== typeof obj ? obj : obj[${index}] }`;
  }
  return new Function(body)();
}

module.exports = builder;
