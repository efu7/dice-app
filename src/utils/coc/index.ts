import { parseCoc } from "./parser";
import { rollCoc } from "./roller";

export function executeCoc(command: string) {

  const parsed = parseCoc(command);

  return rollCoc(parsed, command);
}

export * from "./types";