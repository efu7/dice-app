import type{ CocResult } from "./types";

export function judge(result: CocResult): CocResult {

  const value = result.roll;
  const target = result.target;

  if (value <= 5) {
    result.rank = "critical";
    result.success = true;
    return result;
  }

  if (value <= Math.floor(target / 5)) {
    result.rank = "extreme";
    result.success = true;
    return result;
  }

  if (value <= Math.floor(target / 2)) {
    result.rank = "hard";
    result.success = true;
    return result;
  }

  if (value <= target) {
    result.rank = "success";
    result.success = true;
    return result;
  }

  if (value >= 96) {
    result.rank = "fumble";
    result.success = false;
    return result;
  }

  result.rank = "failure";
  result.success = false;

  return result;
}