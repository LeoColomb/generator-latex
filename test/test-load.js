/* eslint-env mocha */

const assert = require('yeoman-assert');

describe('can be imported without blowing up', () => {
  it('latex', () => {
    const app = require('../generators/app');
    assert(app !== undefined);
  });

  it('latex:chapter', () => {
    const app = require('../generators/chapter');
    assert(app !== undefined);
  });
});
