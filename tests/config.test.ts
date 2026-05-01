import { describe, it, expect } from 'vitest'
import {getViewportScale} from '../src/config.ts'


describe("getViewportScale default function", () => {
  it.each ([
    [1920, 1080, 40, 40, 4.15],
  ]) ("getViewportScale(%i, %i, %i, %i) should return a value close to %d", (a, b, c, d, expected) => {
    expect(getViewportScale(a, b, c, d)).toBeCloseTo(expected);
  }); 
}); 
