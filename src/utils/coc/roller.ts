import { judge } from "./judge";
import type { CocCommand, CocResult } from "./types";

export function rollCoc(
  command: CocCommand,
  original: string
): CocResult {

  const roll = Math.floor(Math.random() * 100) + 1;

  return judge({
    command: original,
    roll,
    target: command.target,
    success: false,
    rank: "failure",
  });
}