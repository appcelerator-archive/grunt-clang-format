/*
 * grunt-clang-format
 * https://github.com/ingo/grunt-clang-format
 *
 * Copyright (c) 2015 Ingo Muschenetz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	var source = [ 'Gruntfile.js', 'tasks/*.js', 'test/*_test.js' ];

	// Project configuration.
	grunt.initConfig({
		appcJs: {
			src: source
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-appc-js');
	// By default, lint and run all tests.
	grunt.registerTask('default', [ 'appcJs' ]);

};
