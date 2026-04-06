import { assertType, describe, expectTypeOf, it, expect } from 'vitest'
import { isometricToScreen, screenToIsometric } from '../../src/utils/isometricMath.ts'

describe("isometricToScreen default function", () => {
  it.each ([
    [1, 1, {x:0, y:1}],
    [0, 0, {x:0, y:0}],
    [10, 5, {x:2.5, y:7.5}],
    [5, 10, {x:-2.5, y:7.5}],
    [1, 2, {x:-0.5, y:1.5}],
    [2, 1, {x:0.5, y:1.5}],
    [5, -10, {x:7.5, y:-2.5}],
    [10, -5, {x:7.5, y:2.5}]

  ]) ("isometricToScreen(%i, %i) should return %s", (a, b, expected) => {
    expect(isometricToScreen(a, b)).toStrictEqual(expected);
    expectTypeOf({ x: a, y: b }).toEqualTypeOf<{ x: number, y: number }>();
  }); 
}); 

describe("isometricToScreen function", () => {
  it.each ([
    [1, 1, {x:0, y:1}],
    [0, 0, {x:0, y:0}],
    [10, 5, {x:2.5, y:7.5}],
    [5, 10, {x:-2.5, y:7.5}],
    [1, 2, {x:-0.5, y:1.5}],
    [2, 1, {x:0.5, y:1.5}],
    [5, -10, {x:7.5, y:-2.5}],
    [10, -5, {x:7.5, y:2.5}]

  ]) ("isometricToScreen(%i, %i, 0, 1, 1) should return %s", (a, b, expected) => {
    expect(isometricToScreen(a, b, 0, 1, 1)).toStrictEqual(expected);
  }); 
}); 



describe("screenToIsometric default function", () => {
  it.each ([
    [0, 1, {x:1, y:1, z:0}],
    [0, 0, {x:0, y:0, z:0}],
    [2.5, 7.5, {x:10, y:5, z:0}],
    [-2.5, 7.5, {x:5, y:10, z:0}],
    [-0.5, 1.5, {x:1, y:2, z:0}],
    [0.5, 1.5, {x:2, y:1, z:0}],
    [7.5, -2.5, {x:5, y:-10, z:0}],
    [7.5, 2.5, {x:10, y:-5, z:0}]

  ]) ("screenToIsometric(%i, %i) should return %s", (a, b, expected) => {
    expect(screenToIsometric(a, b)).toStrictEqual(expected);
  }); 
}); 

describe("screenToIsometric function", () => {
  it.each ([
    [0, 1, {x:1, y:1, z:0}],
    [0, 0, {x:0, y:0, z:0}],
    [2.5, 7.5, {x:10, y:5, z:0}],
    [-2.5, 7.5, {x:5, y:10, z:0}],
    [-0.5, 1.5, {x:1, y:2, z:0}],
    [0.5, 1.5, {x:2, y:1, z:0}],
    [7.5, -2.5, {x:5, y:-10, z:0}],
    [7.5, 2.5, {x:10, y:-5, z:0}]

  ]) ("screenToIsometric(%i, %i, 1, 1) should return %s", (a, b, expected) => {
    expect(screenToIsometric(a, b, 1, 1)).toStrictEqual(expected);
  }); 
}); 