import type { DiceResult } from "./types";

export function judge(result: DiceResult): DiceResult {
  if (result.target === undefined) {
    return result;
  }

  const success = result.total <= result.target;
  const critical = result.total === 1;
  const fumble = result.total === 100;

  return {
    ...result,
    success,
    critical,
    fumble,
  };
}