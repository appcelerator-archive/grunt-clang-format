/*
 * grunt-clang-format
 * https://github.com/ingo/grunt-clang-format
 *
 * Copyright (c) 2015 Ingo Muschenetz
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec,
    format = require('util').format;

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('clangFormat', 'Format your objective-c code using the clang-format tool', function () {

		var done = this.async();

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			punctuation: '.',
			separator: ', '
		});

		// Iterate over all specified file groups.
		this.files.forEach(function (f) {

			// Concat specified files.
			var src = f.src.filter(function (filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function (filepath) {

				var cmd = format('clang-format -i %s', filepath);

				grunt.log.debug(cmd);
				exec(cmd, function (err, stdout, stderr) {
					if (err) { grunt.fail.fatal(err); }
					// Print a success message.
					grunt.log.ok('Formatted "' + filepath + '"');
				});

			}).join(grunt.util.normalizelf(options.separator));

			done();

		});

	});

};
