import { parseCommand } from "./parser";
import { roll } from "./roller";
import { judge } from "./judge";

export function rollDice(command: string) {

  const dice = parseCommand(command);

  const result = roll(dice, command);

  return judge(result);
}

export * from "./types";