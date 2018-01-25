'use strict';

var Register = require('file-register');

// The lib.
var lib = Register();

// Register files.
lib.register('./lib');

// Export.
module.exports = lib;
