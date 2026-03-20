export type Operator = '+' | '-' | '*' | '/';

export type Expression = 
  { kind: "num"; value: number } |
  { kind: "expr"; op: Operator; left: Expression; right: Expression};

export type GenSpec = {
  ops: Operator[];
  maxNum: number;
  maxDepth: number;
}

export type MathProblem = {
  problemId: string;
  gradeLevel: number;
  expr: Expression;
  timeLimit?: number;
}
