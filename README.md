# grunt-clang-format

> Format your Objective-C code using the clang-format tool

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-clang-format --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-clang-format');
```

## Usage

Formats all of the files specified by the "src" parameter using the relevant .clang-format file (usually at the project root).

```js
grunt.initConfig({
  clangFormat: {
    src: [ 'test/**/*_test.js' ]
  }
});
```

Since clang-format is required to be installed, installing via Homebrew is suggested: `brew install clang-format`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

version | details
--------|--------
v0.1.0  | initial release
v0.2.0  | package clang-format with module
v0.3.0  | corrected errors in packaging
