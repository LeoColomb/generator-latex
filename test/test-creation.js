/*global describe, before, it*/
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs-extra');

describe('creates expected files', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        'name': 'Test LaTeX',
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

  // Don't work, don't know why...
  //it('latex:chapter generator', function (done) {
  //  assert.file('src/1/main.tex');
  //  assert.fileContent('main.tex', /\\input{src\/1\/main\.tex}/);
  //  assert.fileContent('src/1/main.tex', /\\chapter{First Chapter}/);
  //  done();
  //});
});

describe('creates a chapter', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../chapter'))
      .inDir(path.join(__dirname, './temp'), function (dir) {
        fs.copySync(path.join(__dirname, '../app/templates'), dir)
      })
      .withPrompt({
        'chapterName': 'Test LaTex',
        'chapterNum': '2'
      })
      .on('end', done);
  });

  it('latex:chapter generator', function (done) {
    assert.file('src/2/main.tex');
    assert.fileContent('main.tex', /\\input{src\/2\/main\.tex}/);
    assert.fileContent('src/2/main.tex', /\\chapter{Test LaTex}/);
    done();
  });
});
