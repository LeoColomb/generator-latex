/*global describe, before, it*/
'use strict';
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const deps = [
  [helpers.createDummyGenerator(), 'latex:chapter']
];

describe('creates expected project', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'projectName': 'Test LaTeX',
        'docClass': 'book',
        'language': 'french',
        'bib': true,
        'figs': true
      })
      .withGenerators(deps)
      .toPromise();
  });

  it('files', function () {
    assert.file([
      'package.json',
      'main.tex',
      'src/refs.bib',
      'Gruntfile.js',
      '.editorconfig',
      'figs.js'
    ]);
    assert.noFile('src/glos.bib');
  });

  it('templates', function () {
    assert.fileContent('main.tex', /\%\sTest LaTeX/);
    assert.fileContent('package.json', /"name"\:\s"test-la-te-x"/);
  });
});

describe('adds a chapter', function () {
  describe('with prompts', function () {
    beforeEach(function () {
      return helpers.run(path.join(__dirname, '../generators/chapter'))
        .inTmpDir(function (dir) {
          require('fs-extra').copySync(path.join(__dirname, '../generators/app/templates'), dir);
        })
        .withPrompts({
          'chapterName': 'Test LaTex Chapter',
          'chapterNum': '2'
        })
        .toPromise();
    });

    it('files', function () {
      assert.file('src/2/main.tex');
    });

    it('templates', function () {
      assert.fileContent('main.tex', /\\input{src\/2\/main\.tex}/);
      assert.fileContent('src/2/main.tex', /\\chapter{Test LaTex Chapter}/);
    });
  });

  describe('with args', function () {
    beforeEach(function () {
      return helpers.run(path.join(__dirname, '../generators/chapter'))
        .inTmpDir(function (dir) {
          require('fs-extra').copySync(path.join(__dirname, '../generators/app/templates'), dir);
        })
        .withArguments([8, 'Test Old Chapter'])
        .toPromise();
    });

    it('files', function () {
      assert.file('src/8/main.tex');
    });

    it('templates', function () {
      assert.fileContent('main.tex', /\\input{src\/8\/main\.tex}/);
      assert.fileContent('src/8/main.tex', /\\chapter{Test Old Chapter}/);
    });
  });
});
