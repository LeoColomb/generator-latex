/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('latex generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('latex:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'package.json',
      'main.tex',
      'src/1/main.tex',
      'src/refs.bib',
      'Gruntfile.js',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'Test LaTex',
      'class': 'book',
      'language': 'french',
      'bib': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
