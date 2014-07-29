'use strict';
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var debug = require('debug')('broccoli:replicate:test');
var lookFor = ['bad.file','testCoffee.coffee','testJs.js','testPHP.php'];


// cleanup after testing
after(function () {
	// remove the Broccoli temporary directory (in case it hasn't done this itself)
	rimraf.sync('tmp'); // the broccoli temporary directory
	// remove the directory that `broccoli build` targets
	rimraf.sync('test');
});

// One path
it('should have created a "one" path', function () {
	var dir = 'one';
	lookFor.forEach(function(testFile) {
		testFile = path.join('test',dir,testFile);
		assert(fs.existsSync(testFile), 'files should have been replicated to the "' + dir + '" path.');
	});
});

// Two path
it('should have created a "two" path', function () {
	var dir = 'two';
	lookFor.forEach(function(testFile) {
		testFile = path.join('test',dir,testFile);
		assert(fs.existsSync(testFile), 'files should have been replicated to the "' + dir + '" path.');
	});
});

// Three path
it('should have created a "three" path', function () {
	var dir = 'three';
	lookFor.forEach(function(testFile) {
		testFile = path.join('test',dir,testFile);
		debug(testFile);
		assert(fs.existsSync(testFile), 'files should have been replicated to the "' + dir + '" path.');
	});
});

