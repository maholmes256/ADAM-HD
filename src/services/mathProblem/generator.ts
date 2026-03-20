import { GRADE_TO_SPEC } from "./specMap";
import { Expression, GenSpec, MathProblem } from "./types";

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateExpression(spec: GenSpec): Expression {
  function genNode(depth: number): Expression {
    if (depth === 0) return {kind: "num", value: randInt(0, spec.maxNum)};
    
    const op = spec.ops[randInt(0, spec.ops.length - 1)];
    let left = genNode(depth - 1);
    let right = genNode(depth - 1);

    return {kind: "expr", op: op, left: left, right: right};
  }

  return genNode(randInt(1, spec.maxDepth));
}

export function generateProblem(grade: number) : MathProblem {
  const spec: GenSpec = GRADE_TO_SPEC[grade];
  if (!spec) throw new Error(`No spec found for grade: ${grade}`)

  return {
    problemId: crypto.randomUUID(),
    expr: generateExpression(spec),
    gradeLevel: grade
  }
}
