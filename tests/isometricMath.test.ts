import { assertType, describe, expectTypeOf, it, expect } from 'vitest'
import { isometricToScreen, screenToIsometric } from '../src/utils/isometricMath.ts'
describe("isometricToScreen default function", () => {
  it("should return x===0, y===0.5, when (1,1) is entered", () => {
    expect(isometricToScreen(1, 1)).toStrictEqual({x: 0, y:0.5});
    expect(isometricToScreen(1, 2)).toStrictEqual({x: -0.5, y:0.75});

    expectTypeOf({ x: 1, y: 1 }).toEqualTypeOf<{ x: number, y: number }>();


  });
}); 

describe("isometricToScreen function", () => {
  it("should return x===0, y===0.5, when (1,1,0,1,1) is entered", () => {
    expect(isometricToScreen(1, 1, 0, 1, 1)).toStrictEqual({x: 0, y:0.5});
  });
}); 

describe("screenToIsometric default function", () => {
  it("should return x===1, y===1, when (0,1.5) is entered", () => {
    expect(screenToIsometric(1.5, 0.75)).toStrictEqual({x: 1, y:2, z:0});
  });
}); 

describe("screenToIsometric function", () => {
  it("should return x===1, y===1, when (0,1.5,1,1) is entered", () => {
    expect(screenToIsometric(0, 1.5, 1, 1)).toStrictEqual({x: 1, y:1, z:0});
  });
}); 