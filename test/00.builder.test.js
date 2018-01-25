'use strict';

const should = require('should');
const builder = require('../lib/builder');

describe('The builder', () => {
  it('should be there', () => {
    should(builder).be.a.Function();
  });

  it('can build a function', () => {
    should(builder()).be.a.Function();
  });

  it('can build a function', () => {
    should(builder(['dev'])).be.a.Function();
  });

  it('can build a function', () => {
    should(builder(['dev'], 'LOREM')).be.a.Function();
  });

  it('cannot build with a bad argument', () => {
    should(function() {
      builder('LOREM');
    }).throw();
  });

  it('cannot build with a bad argument', () => {
    should(function() {
      builder(['dev'], {});
    }).throw();
  });
});
