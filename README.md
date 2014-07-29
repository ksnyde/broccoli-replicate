#broccoli-replicate
*A [broccoli](https://github.com/joliss/broccoli) plugin that replicates a directory across one or more paths*

## Installation ##

At the root of your development project type:

````bash
npm install broccoli-replicate --save
````

## Usage
The signature of the plugin is:

````js
var replicatedTree = replicate(inputTree, [paths], options) { }
````

- The `inputTree` is either a broccoli tree or a string representing a directory which can be converted to a tree
- The `paths` array is a series of directories which the tree will be replicated to
- The `options` hash is there for future use but has no functional definition currently
- The `replicatedTree` output is a broccoli tree which has copies of the input tree replicated the various paths indicates by the *paths* array 

An example of this plugin as it would be in your `brocfile.js`:

````js
var replicate = require('broccoli-replicate');
var replicated  = replicate('style', ['one','two','three']);

module.exports = replicated;
````

In the example the `style` directory would be converted into a broccoli tree, and all files, directories, and subdirectories in this tree would be copied to a `/one/*`, `/two/*`, `/three/*` paths.

## Code Documentation
Documentation of the plugin can be found here:

> [broccoli-docco](http://htmlpreview.github.io/?https://github.com/ksnyde/broccoli-replicate/blob/master/docs/index.html)

----
Happy trails,

*Ken Snyder*