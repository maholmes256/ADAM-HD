import { assertType, describe, expectTypeOf, it, expect } from 'vitest'
import { generateProblem } from '../../../src/services/mathProblem/generator.ts'
import { GRADE_TO_SPEC } from "../../../src/services/mathProblem/specMap";
import { Expression, GenSpec, MathProblem } from "../../../src/services/mathProblem/types";

describe("generateProblem check grade", () => {
  it.each ([
    [0, Error("No spec found for grade")],
    [1, 1],
    [2,2],
    [3,3],
    [4,Error("No spec found for grade")],
    [10, Error("No spec found for grade")]

  ]) ("generateProblem(%i) should return %s", (a, expected) => {
    if (1 > a || a >= 4) {
    
    expect(() => generateProblem(a)).toThrow();
    }
    else {
      expect(generateProblem(a).gradeLevel).toBe(expected);
    }
  }); 
}); 

describe("generateProblem check equation", () => {
  it.each ([
    [1, 11],
    [2,21],
    [3,31],

  ]) ("generateProblem(%i) should return with an appropriate operation value", (a, expected) => {
      
      
    const p = generateProblem(a);  
    console.log(p);
      // @ts-ignore
      expect(p.expr?.op).toBeOneOf(['+', '-', '*', '/']);
      // @ts-ignore
      console.log(p.expr?.op);

  }); 
}); 
