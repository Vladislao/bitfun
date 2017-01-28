const expect = require('chai').expect;
const bitmask = require('./index.js');

console.log(bitmask.add);
describe('bitmask', () => {
  describe('add', () => {
    it('should add one flag', () => {
      const res1 = bitmask.add(2, [1]);
      expect(res1).to.be.eql(3);

      const res2 = bitmask.add(0, [4]);
      expect(res2).to.be.eql(4);
    });
    it('should add another map', () => {
      const res1 = bitmask.add(2, [3]);
      expect(res1).to.be.eql(3);

      const res2 = bitmask.add(1, [6]);
      expect(res2).to.be.eql(7);
    });
    it('should add multiple flags', () => {
      const res = bitmask.add(2, [1, 4]);
      expect(res).to.be.eql(7);
    });
    it('should not set new bits', () => {
      const res1 = bitmask.add(2, [2]);
      expect(res1).to.be.eql(2);

      const res2 = bitmask.add(2, [2, 1]);
      expect(res2).to.be.eql(3);
    });
    it('should return unchanged map if nothing provided', () => {
      const res = bitmask.add(2, []);
      expect(res).to.be.eql(2);
    });
    it('should handle undefined', () => {
      const res = bitmask.add(undefined, []);
      expect(res).to.be.eql(0);

      const res2 = bitmask.add(undefined, [1, 4]);
      expect(res2).to.be.eql(5);

      const res3 = bitmask.add(null, [1, 2]);
      expect(res3).to.be.eql(3);
    });
  });

  describe('remove', () => {
    it('should remove one flag', () => {
      const res = bitmask.remove(3, [1]);
      expect(res).to.be.eql(2);
    });
    it('should remove one map', () => {
      const res = bitmask.remove(7, [3]);
      expect(res).to.be.eql(4);
    });
    it('should remove multiple flags', () => {
      const res = bitmask.remove(7, [1, 4]);
      expect(res).to.be.eql(2);
    });
    it('should not remove unset bits', () => {
      const res1 = bitmask.remove(2, [1, 4]);
      expect(res1).to.be.eql(2);

      const res2 = bitmask.remove(3, [2, 4]);
      expect(res2).to.be.eql(1);
    });
    it('should return unchanged map if nothing provided', () => {
      const res = bitmask.remove(2, []);
      expect(res).to.be.eql(2);
    });
    it('should handle undefined', () => {
      const res = bitmask.remove(undefined, []);
      expect(res).to.be.eql(0);
    });
  });

  describe('fromArray', () => {
    it('should work exactly the same as add with 0 as first arg', () => {
      const res = bitmask.fromArray([1, 4]);
      expect(res).to.be.eql(5);
    });
  });

  describe('equals', () => {
    it('should return true for zeroes', () => {
      const res = bitmask.equals(0, []);
      expect(res).to.be.true;
    });
    it('should return true for equal flags', () => {
      const res = bitmask.equals(3, [1, 2]);
      expect(res).to.be.true;
    });
    it('should return true for equal maps', () => {
      const res = bitmask.equals(3, [3]);
      expect(res).to.be.true;
    });
    it('should return false for not equal flags', () => {
      const res = bitmask.equals(4, [1, 3]);
      expect(res).to.be.false;
    });
    it('should return false for partially equal flags', () => {
      const res = bitmask.equals(3, [1, 4]);
      expect(res).to.be.false;
    });
    it('should return false for flags, included in map', () => {
      const res = bitmask.equals(7, [1, 4]);
      expect(res).to.be.false;
    });
    it('should handle undefined', () => {
      const res = bitmask.equals(undefined, [1, 4]);
      expect(res).to.be.false;

      const res2 = bitmask.equals(undefined, []);
      expect(res2).to.be.false;
    });
  });

  describe('includes', () => {
    it('should return true for zeroes', () => {
      const res = bitmask.includes(0, []);
      expect(res).to.be.true;
    });
    it('should return true for equal flags', () => {
      const res = bitmask.includes(3, [1, 2]);
      expect(res).to.be.true;
    });
    it('should return true for equal maps', () => {
      const res = bitmask.includes(3, [3]);
      expect(res).to.be.true;
    });
    it('should return false for not equal flags', () => {
      const res = bitmask.includes(4, [1, 3]);
      expect(res).to.be.false;
    });
    it('should return false for partially equal flags', () => {
      const res = bitmask.includes(3, [1, 4]);
      expect(res).to.be.false;
    });
    it('should return true for flags, included in map', () => {
      const res = bitmask.includes(7, [1, 4]);
      expect(res).to.be.true;
    });
    it('should handle undefined', () => {
      const res = bitmask.includes(undefined, [1, 4]);
      expect(res).to.be.false;

      const res2 = bitmask.includes(undefined, []);
      expect(res2).to.be.false;
    });
  });

  describe('excludes', () => {
    it('should return false for zeroes', () => {
      const res = bitmask.excludes(0, []);
      expect(res).to.be.false;
    });
    it('should return false for equal flags', () => {
      const res = bitmask.excludes(3, [1, 2]);
      expect(res).to.be.false;
    });
    it('should return false for equal maps', () => {
      const res = bitmask.excludes(3, [3]);
      expect(res).to.be.false;
    });
    it('should return true for not equal flags', () => {
      const res = bitmask.excludes(4, [1, 3]);
      expect(res).to.be.true;
    });
    it('should return true for partially equal flags', () => {
      const res = bitmask.excludes(3, [1, 4]);
      expect(res).to.be.true;
    });
    it('should return false for flags, included in map', () => {
      const res = bitmask.excludes(7, [1, 4]);
      expect(res).to.be.false;
    });
    it('should handle undefined', () => {
      const res = bitmask.excludes(undefined, [1, 4]);
      expect(res).to.be.false;

      const res2 = bitmask.excludes(undefined, []);
      expect(res2).to.be.false;
    });
  });

  describe('noneOf', () => {
    it('should return false for zeroes', () => {
      const res = bitmask.noneOf(0, []);
      expect(res).to.be.false;
    });
    it('should return false for equal flags', () => {
      const res = bitmask.noneOf(3, [1, 2]);
      expect(res).to.be.false;
    });
    it('should return false for equal maps', () => {
      const res = bitmask.noneOf(3, [3]);
      expect(res).to.be.false;
    });
    it('should return true for not equal flags', () => {
      const res = bitmask.noneOf(4, [1, 3]);
      expect(res).to.be.true;
    });
    it('should return false for partially equal flags', () => {
      const res = bitmask.noneOf(3, [1, 4]);
      expect(res).to.be.false;
    });
    it('should return false for flags, included in map', () => {
      const res = bitmask.noneOf(7, [1, 4]);
      expect(res).to.be.false;
    });
    it('should handle undefined', () => {
      const res = bitmask.noneOf(undefined, [1, 4]);
      expect(res).to.be.false;

      const res2 = bitmask.noneOf(undefined, []);
      expect(res2).to.be.false;
    });
  });
});
