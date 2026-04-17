import { assertType, describe, expectTypeOf, it, expect, vitest } from 'vitest'
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
    1,
    2,
    3,
  ]) ("generateProblem(%i) should return with an appropriate operation value", (a) => {
      
    const p = generateProblem(a);  
      // @ts-ignore
    expect(p.expr?.op).toBeOneOf(['+', '-', '*', '/']);
      // @ts-ignore
    expect(p.problemId).toBeTypeOf("string");
    expect(p.problemId).not.toBeNull;


  }); 
}); 


describe("generateProblem call", () => {
  const generated = {
  generateNewProblem(grade: number) {
    return generateProblem(grade).gradeLevel;
  },
  }

  it.each ([
    1,
    2,
    3,

  ]) ("generateProblem(%i) should be appropriately called", (a) => {
    
    const generateProblemSpy = vitest.spyOn(generated, 'generateNewProblem');

    const gradeTest = generated.generateNewProblem(a);
//Checks that generateProblem(a) has been appropriately returned, and called
    expect(gradeTest).toBe(a);
    expect(generateProblemSpy).toHaveBeenCalledWith(a);
    expect(generateProblemSpy).toHaveReturned;
//Checks that 
    generated.generateNewProblem(3);
    generated.generateNewProblem(1);
    generated.generateNewProblem(2);

    expect(generateProblemSpy).toHaveBeenLastCalledWith(2);
    expect(generateProblemSpy).toHaveNthReturnedWith(3, 1);
   
  }); 
});
