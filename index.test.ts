import { describe, expect, it } from "@jest/globals";
import * as bitmask from "./index";

const random = (min: number, max: number) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

describe("bitmask", () => {
  describe("add", () => {
    it("should add one flag", () => {
      const res1 = bitmask.add(2, [1]);
      expect(res1).toBe(3);

      const res2 = bitmask.add(0, [4]);
      expect(res2).toBe(4);
    });
    it("should add another map", () => {
      const res1 = bitmask.add(2, [3]);
      expect(res1).toBe(3);

      const res2 = bitmask.add(1, [6]);
      expect(res2).toBe(7);
    });
    it("should add multiple flags", () => {
      const res = bitmask.add(2, [1, 4]);
      expect(res).toBe(7);
    });
    it("should not set new bits", () => {
      const res1 = bitmask.add(2, [2]);
      expect(res1).toBe(2);

      const res2 = bitmask.add(2, [2, 1]);
      expect(res2).toBe(3);
    });
    it("should return unchanged map if nothing provided", () => {
      const res = bitmask.add(2, []);
      expect(res).toBe(2);
    });
    it("should handle undefined", () => {
      const res = bitmask.add(undefined, []);
      expect(res).toBe(0);

      const res2 = bitmask.add(undefined, [1, 4]);
      expect(res2).toBe(5);

      const res3 = bitmask.add(null, [1, 2]);
      expect(res3).toBe(3);
    });
    it("should handle single value", () => {
      const res = bitmask.add(2, 1);
      expect(res).toBe(3);
    });
  });

  describe("remove", () => {
    it("should remove one flag", () => {
      const res = bitmask.remove(3, [1]);
      expect(res).toBe(2);
    });
    it("should remove one map", () => {
      const res = bitmask.remove(7, [3]);
      expect(res).toBe(4);
    });
    it("should remove multiple flags", () => {
      const res = bitmask.remove(7, [1, 4]);
      expect(res).toBe(2);
    });
    it("should not remove unset bits", () => {
      const res1 = bitmask.remove(2, [1, 4]);
      expect(res1).toBe(2);

      const res2 = bitmask.remove(3, [2, 4]);
      expect(res2).toBe(1);
    });
    it("should return unchanged map if nothing provided", () => {
      const res = bitmask.remove(2, []);
      expect(res).toBe(2);
    });
    it("should handle undefined", () => {
      const res = bitmask.remove(undefined, []);
      expect(res).toBe(0);
    });
    it("should handle single value", () => {
      const res = bitmask.remove(3, 1);
      expect(res).toBe(2);
    });
  });

  describe("fromArray", () => {
    it("should work exactly the same as add with 0 as first arg", () => {
      const res = bitmask.fromArray([1, 4]);
      expect(res).toBe(5);
    });
  });

  describe("toArray", () => {
    it("should handle null", () => {
      const res = bitmask.toArray(null);
      expect(res).toEqual([]);
    });
    it("should handle undefined", () => {
      const res = bitmask.toArray(undefined);
      expect(res).toEqual([]);
    });
    it("should return correct results", () => {
      const res1 = bitmask.toArray(0);
      expect(res1).toEqual([]);

      const res2 = bitmask.toArray(1);
      expect(res2).toEqual([1]);

      const res3 = bitmask.toArray(2);
      expect(res3).toEqual([2]);

      const res4 = bitmask.toArray(3);
      expect(res4).toEqual([1, 2]);

      const res5 = bitmask.toArray(6);
      expect(res5).toEqual([2, 4]);

      const res7 = bitmask.toArray(125);
      expect(res7).toEqual([1, 4, 8, 16, 32, 64]);
    });
    it("should work for MAX_SAFE_INTEGER", () => {
      const res = bitmask.toArray(Number.MAX_SAFE_INTEGER);
      expect(res).toHaveLength(53);
    });
    it("should work for random values", () => {
      for (let i = 100; i--; ) {
        const mask = random(1, Number.MAX_SAFE_INTEGER);
        const res = bitmask.toArray(mask).reduce((acc, v) => acc + v, 0);
        expect(res).toBe(mask);
      }
    });
  });

  describe("equals", () => {
    it("should return true for zeroes", () => {
      const res = bitmask.equals(0, []);
      expect(res).toBe(true);
    });
    it("should return true for equal flags", () => {
      const res = bitmask.equals(3, [1, 2]);
      expect(res).toBe(true);
    });
    it("should return true for equal maps", () => {
      const res = bitmask.equals(3, [3]);
      expect(res).toBe(true);
    });
    it("should return false for not equal flags", () => {
      const res = bitmask.equals(4, [1, 3]);
      expect(res).toBe(false);
    });
    it("should return false for partially equal flags", () => {
      const res = bitmask.equals(3, [1, 4]);
      expect(res).toBe(false);
    });
    it("should return false for flags, included in map", () => {
      const res = bitmask.equals(7, [1, 4]);
      expect(res).toBe(false);
    });
    it("should handle undefined", () => {
      const res = bitmask.equals(undefined, [1, 4]);
      expect(res).toBe(false);

      const res2 = bitmask.equals(undefined, []);
      expect(res2).toBe(false);
    });
  });

  describe("includes", () => {
    it("should return true for zeroes", () => {
      const res = bitmask.includes(0, []);
      expect(res).toBe(true);
    });
    it("should return true for equal flags", () => {
      const res = bitmask.includes(3, [1, 2]);
      expect(res).toBe(true);
    });
    it("should return true for equal maps", () => {
      const res = bitmask.includes(3, [3]);
      expect(res).toBe(true);
    });
    it("should return false for not equal flags", () => {
      const res = bitmask.includes(4, [1, 3]);
      expect(res).toBe(false);
    });
    it("should return false for partially equal flags", () => {
      const res = bitmask.includes(3, [1, 4]);
      expect(res).toBe(false);
    });
    it("should return true for flags, included in map", () => {
      const res = bitmask.includes(7, [1, 4]);
      expect(res).toBe(true);
    });
    it("should handle undefined", () => {
      const res = bitmask.includes(undefined, [1, 4]);
      expect(res).toBe(false);

      const res2 = bitmask.includes(undefined, []);
      expect(res2).toBe(false);
    });
  });

  describe("excludes", () => {
    it("should return false for zeroes", () => {
      const res = bitmask.excludes(0, []);
      expect(res).toBe(false);
    });
    it("should return false for equal flags", () => {
      const res = bitmask.excludes(3, [1, 2]);
      expect(res).toBe(false);
    });
    it("should return false for equal maps", () => {
      const res = bitmask.excludes(3, [3]);
      expect(res).toBe(false);
    });
    it("should return true for not equal flags", () => {
      const res = bitmask.excludes(4, [1, 3]);
      expect(res).toBe(true);
    });
    it("should return true for partially equal flags", () => {
      const res = bitmask.excludes(3, [1, 4]);
      expect(res).toBe(true);
    });
    it("should return false for flags, included in map", () => {
      const res = bitmask.excludes(7, [1, 4]);
      expect(res).toBe(false);
    });
    it("should handle undefined", () => {
      const res = bitmask.excludes(undefined, [1, 4]);
      expect(res).toBe(false);

      const res2 = bitmask.excludes(undefined, []);
      expect(res2).toBe(false);
    });
  });

  describe("noneOf", () => {
    it("should return false for zeroes", () => {
      const res = bitmask.noneOf(0, []);
      expect(res).toBe(false);
    });
    it("should return false for equal flags", () => {
      const res = bitmask.noneOf(3, [1, 2]);
      expect(res).toBe(false);
    });
    it("should return false for equal maps", () => {
      const res = bitmask.noneOf(3, [3]);
      expect(res).toBe(false);
    });
    it("should return true for not equal flags", () => {
      const res = bitmask.noneOf(4, [1, 3]);
      expect(res).toBe(true);
    });
    it("should return false for partially equal flags", () => {
      const res = bitmask.noneOf(3, [1, 4]);
      expect(res).toBe(false);
    });
    it("should return false for flags, included in map", () => {
      const res = bitmask.noneOf(7, [1, 4]);
      expect(res).toBe(false);
    });
    it("should handle undefined", () => {
      const res = bitmask.noneOf(undefined, [1, 4]);
      expect(res).toBe(false);

      const res2 = bitmask.noneOf(undefined, []);
      expect(res2).toBe(false);
    });
  });
});
