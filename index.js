// ![ ](replicate.png)
// #broccoli-replicate
// > a subclass of [broccoli-writer](https://github.com/broccolijs/broccoli-writer) 
//
// *Replicate the input tree to one or more output paths*
var 
	Writer = require('broccoli-writer'),
	path = require('path'),
	pickFiles = require('broccoli-static-compiler'),
	RSVP = require('rsvp'),
	wrench = require('wrench'),
	debug = require('debug')('broccoli:replicate');

// ##Class Prototype##
// Parameters:
// 
// - `inputTree` - the input tree which is the source of the replication
// - `paths` - an array of paths which the *inputTree* will be replicated to
// - `options` - an options hash to configure behaviour, key hash options include:
//      - `destDir` - the base directory to write the documentation to; defaults to '/docs'
//      - `docco` - the Docco package provides an options hash which is proxied to this property
function Replicator(inputTree, dirs, options) {
	'use strict';
	
	if (!(this instanceof Replicator)) {
		return new Replicator(inputTree, dirs, options);
	}
  
	if (typeof inputTree === 'string') {
		debug('Input tree is a string, converting to tree');
		this.inputTree = pickFiles(inputTree, {
			srcDir: '/',
			destDir: '/'
		});
	} else {
		this.inputTree = inputTree; // assumed to be a tree object
	}
	/* TODO: make this defaulting pattern prettier ... must be a common way of doing this in JS-land */
	options = options || {};
	this.dirs = dirs || [];	
	debug('Replicator paths are ', this.dirs);
}

// Extends `broccoli-writer` class
Replicator.prototype = Object.create(Writer.prototype);
Replicator.prototype.constructor = Replicator;
Replicator.prototype.description = 'Broccoli replicator';
// Modules Export
module.exports = Replicator;

// ## write ##
// extending the broccoli-writer's required `write` method
Replicator.prototype.write = function(readTree, destDir) {
	'use strict';
	var self = this;
	// wait for event/file change and then respond
	return readTree(this.inputTree).then(function (srcDir) {
		// return a promise to Broccoli so that it waits for the async processes to complete 
		return new RSVP.Promise(function(resolve,reject) {
			debug('Operating directory: ' + path.resolve('.'));
			debug('Source directory: ' + srcDir);
			debug('Destination directory: ' + destDir);
			
			// Iterate through each path
			self.dirs.forEach(function(dir) {
				dir = path.join(destDir,dir);
				try {
					// use `wrench` to copy to broccoli destination directory
					wrench.copyDirSyncRecursive(srcDir, dir, self.options);
				} catch (e) {
					// Failure
					reject(e);
				}
			});				
			// Success
			resolve();
		});
	});
};
