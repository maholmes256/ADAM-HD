import { GenSpec } from "./types";

// Record is the same as Map but it is optimized for objects known before run-time
export const GRADE_TO_SPEC: Record<number, GenSpec> = {
  1: {ops: ['+', '-'], maxNum: 20, maxDepth: 1},
  2: {ops: ['+', '-'], maxNum: 99, maxDepth: 1},
  3: {ops: ['+', '-', '*'], maxNum: 999, maxMultNum: 12, maxDepth: 1},
  4: {ops: ['+', '-', '*'], maxNum: 9999, maxMultNum: 99, maxDepth: 1},
  5: {ops: ['+', '-', '*'], maxNum: 20, maxDepth: 2, minDepth: 2}
};
