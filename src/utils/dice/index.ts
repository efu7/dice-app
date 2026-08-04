import { parseCommand } from "./parser";
import { roll } from "./roller";

export function rollDice(command: string) {
  const parsed = parseCommand(command);
  return roll(parsed, command);
}

export * from "./types";