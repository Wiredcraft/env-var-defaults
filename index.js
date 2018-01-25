'use strict';

const path = require('path');
const Register = require('file-register');

// The lib.
const lib = Register();

// Register files.
lib.register(path.resolve(__dirname, 'lib'));

// Export.
module.exports = lib;
