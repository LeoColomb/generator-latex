/*global describe, it*/
'use strict';
var assert = require('assert');

describe('can be imported without blowing up', function () {
  it('latex generator', function () {
    var app = require('../app');
    assert(app !== undefined);
  });

  it('latex:chapter generator', function () {
    var app = require('../chapter');
    assert(app !== undefined);
  });
});
