import { assertType, describe, expectTypeOf, it, expect } from 'vitest'
import { isometricToScreen, screenToIsometric } from '../../src/utils/isometricMath.ts'
describe("isometricToScreen default function", () => {
  it("should return x===0, y===1, when (1,1) is entered", () => {
    expect(isometricToScreen(1, 1)).toStrictEqual({x: 0, y:1});
    
    expectTypeOf({ x: 1, y: 1 }).toEqualTypeOf<{ x: number, y: number }>();


  });
}); 

describe("isometricToScreen function", () => {
  it("should return x===0, y===1, when (1,1,0,1,1) is entered", () => {
    expect(isometricToScreen(1, 1, 0, 1, 1)).toStrictEqual({x: 0, y:1});
  });
}); 

describe("screenToIsometric default function", () => {
  it("should return x===1, y===1, when (0,1) is entered", () => {
    expect(screenToIsometric(0, 1)).toStrictEqual({x: 1, y:1, z:0});
  });
}); 

describe("screenToIsometric function", () => {
  it("should return x===1, y===1, when (0,1,1,1) is entered", () => {
    expect(screenToIsometric(0, 1, 1, 1)).toStrictEqual({x: 1, y:1, z:0});
      });
}); 