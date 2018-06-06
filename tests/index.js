import testValue from '../src/game';

const assert = require('assert');

let val;

beforeEach(() => {
  val = testValue;
});

describe('testValue', function() {
  describe('val', function() {
    it('val === 10', function() {
      assert.equal(val, 10);
    });
  });
});
