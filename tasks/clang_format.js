/*
 * grunt-clang-format
 * https://github.com/ingo/grunt-clang-format
 *
 * Copyright (c) 2015 Ingo Muschenetz
 * Licensed under the MIT license.
 */

'use strict';

const async = require('async'),
	clangFormat = require('clang-format'),
	EXEC_LIMIT = 10;

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('clangFormat', 'Format your objective-c code using the clang-format tool', function () {
		var done = this.async(),
			src = [];

		// Iterate over all specified file groups.
		this.files.forEach(function (f) {
			// Concat specified files.
			src = src.concat(f.src.filter(function (filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}));
		});

		// Format the files in parallel, but limit number of simultaneous execs or we'll fail
		async.mapLimit(src, EXEC_LIMIT, function (filepath, cb) {
			grunt.log.debug(filepath);
			clangFormat.spawnClangFormat([ '-i', filepath ], function (exit) {
				if (exit) {
					grunt.fail.fatal('Failed to format "' + filepath + '"');
					cb(exit);
				}
				// Print a success message.
				grunt.log.ok('Formatted "' + filepath + '"');
				cb();
			}, [ 'ignore', 'pipe', process.stderr ]);
		}, done);
	});
};
