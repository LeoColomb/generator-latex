/* eslint-env mocha */

import { cpSync } from 'fs'
import helpers from 'yeoman-test';

const deps = [
  [helpers.createDummyGenerator(), 'latex:chapter'],
];

describe('creates expected project', () => {
  let runResult;
  beforeEach(async () => {
    runResult = await helpers
      .create('../generators/app')
      .withPrompts({
        projectName: 'Test LaTeX',
        projectUrl: 'https://example.com',
        authorName: 'Bot',
        docClass: 'book',
        language: 'french',
        bib: true,
        figs: true,
      })
      .withGenerators(deps)
      .run()
  });

  it('files', () => {
    runResult.assertFile([
      'package.json',
      'main.tex',
      'src/references.bib',
      'Gruntfile.js',
      '.editorconfig',
      'figs.js',
      'src/1/main.tex',
    ]);
    runResult.assertNoFile('src/glossary.tex');
  });

  it('templates', () => {
    runResult.assertFileContent('main.tex', /\%\sTest LaTeX/);
    runResult.assertFileContent('package.json', /"name"\:\s"test-la-te-x"/);
    runResult.assertFileContent('src/1/main.tex', /\\chapter{First Chapter}/);
  });
});

describe('adds a chapter', () => {
  describe('with prompts', () => {
    let runResult;
    beforeEach(async () => { 
      runResult = await helpers
        .create('../generators/chapter')
        .inTmpDir((dir) => {
          cpSync(new URL('../generators/app/templates', import.meta.url), dir);
        })
        .withPrompts({
          chapterName: 'Test LaTex Chapter',
          chapterNum: '2',
        })
        .run()
    });

    it('files', () => {
      assert.file('src/2/main.tex');
    });

    it('templates', () => {
      assert.fileContent('main.tex', /\\input{src\/2\/main\.tex}/);
      assert.fileContent('src/2/main.tex', /\\chapter{Test LaTex Chapter}/);
    });
  });

  describe('with args', () => {
    let runResult;
    beforeEach(async () => {
      runResult = await helpers
        .create('../generators/chapter')
        .inTmpDir((dir) => {
          cpSync(new URL('../generators/app/templates', import.meta.url), dir);
        })
        .withArguments([8, 'Test Old Chapter'])
        .run()
    });

    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });

    it('files', () => {
      runResult.assertFile('src/8/main.tex');
    });

    it('templates', () => {
      runResult.assertFileContent('main.tex', /\\input{src\/8\/main\.tex}/);
      runResult.assertFileContent('src/8/main.tex', /\\chapter{Test Old Chapter}/);
    });
  });
});
