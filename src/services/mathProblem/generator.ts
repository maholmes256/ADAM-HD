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

export function evalExpr(expr: Expression) : number {
  if (expr.kind === "num") return expr.value;
    const l = evalExpr(expr.left),
    r = evalExpr(expr.right);
  switch (expr.op) {
    case "+":
      return l + r;
    case "-":
      return Math.abs(l - r); // keep positive for grade 1-2
    case "*":
      return l * r;
    case "/":
      return r !== 0 ? Math.round(l / r) : l;
    default:
      return 0;
  }
}

export function exprToString(expr: Expression): String {
  if (expr.kind === "num") return String(expr.value);
  const sym = { "+": "+", "-": "−", "*": "×", "/": "÷" }[expr.op] || expr.op;
  const l = exprToString(expr.left),
    r = exprToString(expr.right);
  const inner = `${l} ${sym} ${r}`;
  return inner;
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
