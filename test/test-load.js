/*global describe, it*/
'use strict';
var assert = require('yeoman-assert');

describe('can be imported without blowing up', function () {
  it('latex', function () {
    var app = require('../generators/app');
    assert(app !== undefined);
  });

  it('latex:chapter', function () {
    var app = require('../generators/chapter');
    assert(app !== undefined);
  });
});
