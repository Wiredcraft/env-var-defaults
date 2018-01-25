'use strict';

const should = require('should');
const builder = require('../lib/builder');
const injected = require('../lib/injected');

describe('Use cases', () => {
  const NODE_ENV = process.env.NODE_ENV;

  describe('With default arguments and test env', () => {
    let defaults;

    before(() => {
      process.env.NODE_ENV = 'test';
      defaults = builder();
    });

    after(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should yield nothing with nothing', () => {
      should(defaults()).equal(undefined);
    });

    it('should yield string with string', () => {
      should(defaults('lorem')).equal('lorem');
    });

    it('should yield nothing with empty array', () => {
      should(defaults([])).equal(undefined);
    });

    it('should yield value with an array', () => {
      should(defaults(['lorem'])).equal('lorem');
    });

    it('should yield value with an array', () => {
      should(defaults(['ipsum', 'dolor'])).equal('ipsum');
    });
  });

  describe('With default arguments and development env', () => {
    let defaults;

    before(() => {
      process.env.NODE_ENV = 'development';
      defaults = builder();
    });

    after(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should yield nothing with nothing', () => {
      should(defaults()).equal(undefined);
    });

    it('should yield string with string', () => {
      should(defaults('lorem')).equal('lorem');
    });

    it('should yield nothing with empty array', () => {
      should(defaults([])).equal(undefined);
    });

    it('should yield value with an array', () => {
      should(defaults(['lorem'])).equal(undefined);
    });

    it('should yield value with an array', () => {
      should(defaults(['ipsum', 'dolor'])).equal('dolor');
    });
  });

  describe('The injected with default arguments and test env', () => {
    let env;

    before(() => {
      process.env.NODE_ENV = 'test';
      env = injected();
    });

    after(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should yield nothing with nothing', () => {
      should(env.get('TEST_LOREM').asString()).equal(undefined);
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM').asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });

    it('should yield string with string', () => {
      should(env.get('TEST_LOREM', 'lorem').asString()).equal('lorem');
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM', 'lorem').asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });

    it('should yield nothing with empty array', () => {
      should(env.get('TEST_LOREM', []).asString()).equal(undefined);
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM', []).asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });

    it('should yield value with an array', () => {
      should(env.get('TEST_LOREM', ['lorem']).asString()).equal('lorem');
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM', ['lorem']).asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });

    it('should yield value with an array', () => {
      should(env.get('TEST_LOREM', ['ipsum', 'dolor']).asString()).equal('ipsum');
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM', ['ipsum', 'dolor']).asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });
  });

  describe('The injected with default arguments and development env', () => {
    let env;

    before(() => {
      process.env.NODE_ENV = 'development';
      env = injected();
    });

    after(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should yield nothing with nothing', () => {
      should(env.get('TEST_LOREM').asString()).equal(undefined);
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM').asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });

    it('should yield string with string', () => {
      should(env.get('TEST_LOREM', 'lorem').asString()).equal('lorem');
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM', 'lorem').asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });

    it('should yield nothing with empty array', () => {
      should(env.get('TEST_LOREM', []).asString()).equal(undefined);
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM', []).asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });

    it('should yield value with an array', () => {
      should(env.get('TEST_LOREM', ['lorem']).asString()).equal(undefined);
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM', ['lorem']).asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });

    it('should yield value with an array', () => {
      should(env.get('TEST_LOREM', ['ipsum', 'dolor']).asString()).equal('dolor');
      process.env.TEST_LOREM = 'test_lorem';
      should(env.get('TEST_LOREM', ['ipsum', 'dolor']).asString()).equal('test_lorem');
      delete process.env.TEST_LOREM;
    });
  });
});
