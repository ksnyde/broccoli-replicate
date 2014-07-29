'use strict';
// ![ ](broccoli.png)
// ##Brocfile##
// this `Brocfile` is used by the *broccoli-docco* unit tests

var replicate = require('./index.js');
var replicated = replicate('fixtures', ['one','two','three'] ); 

module.exports = replicated;