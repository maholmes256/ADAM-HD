import { GenSpec } from "./types";

// Record is the same as Map but it is optimized for objects known before run-time
export const GRADE_TO_SPEC: Record<number, GenSpec> = {
  1: {ops: ['+'], maxNum: 10, maxDepth: 1},
  2: {ops: ['+', '-'], maxNum: 30, maxDepth: 1},
  3: {ops: ['+', '-', '*'], maxNum: 40, maxDepth: 2}
};
