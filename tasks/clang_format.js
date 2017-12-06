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
	fork = require('child_process').fork, // eslint-disable-line security/detect-child-process
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
		async.eachLimit(src, EXEC_LIMIT, function (filepath, cb) {
			let stdout = '';
			let stderr = '';
			const proc = fork(clangFormat.location, [ '-style=file', '-i', filepath ], { silent: true, cwd: process.cwd() });
			proc.stdout.on('data', function (data) {
				stdout += data.toString();
			});
			proc.stderr.on('data', function (data) {
				stderr += data.toString();
			});
			proc.on('close', function (exit) {
				if (exit) {
					const msg = `Failed to check formatting of ${filepath}. Exit code: ${exit}, stdout: ${stdout}, stderr: ${stderr}`;
					return cb(new Error(msg));
				}

				// Print a success message.
				grunt.log.ok('Formatted "' + filepath + '"');
				cb();
			});
		}, done);
	});
};
