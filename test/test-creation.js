/*global describe, before, it*/
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('creates expected files', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        'name': 'Test LaTex',
        'class': 'book',
        'language': 'french',
        'bib': true
      })
      .on('end', done);
  });

  it('latex generator', function (done) {
    var expected = [
      'package.json',
      'main.tex',
      'src/refs.bib',
      'Gruntfile.js',
      '.editorconfig'
    ];
    assert.file(expected);
    assert.noFile('src/glos.bib');
    done();
  });

  it('latex:chapter generator', function (done) {
    assert.file('src/1/main.tex');
    assert.fileContent('main.tex', /\\input{src\/1\/main\.tex}/);
    assert.fileContent('src/2/main.tex', /\\chapter{First Chapter}/);
    done();
  });
});
