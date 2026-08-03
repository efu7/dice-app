import type{ DiceCommand, DiceResult, RollDetail } from "./types";

export type DiceTerm = {
  type: "dice";
  count: number;
  sides: number;
  sign: 1 | -1;
};

export function roll(command: DiceCommand, original: string): DiceResult {
  const details: RollDetail[] = [];

  let modifier = 0;
  let total = 0;

  for (const term of command.terms) {
    if (term.type === "dice") {
      const rolls: number[] = [];

      for (let i = 0; i < term.count; i++) {
        rolls.push(Math.floor(Math.random() * term.sides) + 1);
      }

      const diceTotal = rolls.reduce((sum, value) => sum + value, 0);

      details.push({
        count: term.count,
        sides: term.sides,
        rolls,
        total: diceTotal * term.sign,
      });

      total += diceTotal * term.sign;
    } else {
      modifier += term.value;
      total += term.value;
    }
  }

  return {
    command: original,
    details,
    modifier,
    total,
    target: command.target,
  };
}