import type { DiceCommand, Term } from "./types";
import { tokenize } from "./tokenizer";

export function parseCommand(command: string): DiceCommand {

  command = command.trim().toLowerCase();

  let target: number | undefined;

  const targetMatch = command.match(/<=\d+$/);

  if (targetMatch) {
    target = Number(targetMatch[0].replace("<=", ""));
    command = command.replace(targetMatch[0], "");
  }

  const pieces = tokenize(command);

  const terms: Term[] = [];

  for (let piece of pieces) {

    let sign: 1 | -1 = 1;

    if (piece.startsWith("+")) {
        piece = piece.substring(1);
    }

    if (piece.startsWith("-")) {
        sign = -1;
        piece = piece.substring(1);
    }

    const diceMatch = piece.match(/^(\d+)d(\d+)$/);


    if (diceMatch) {

      terms.push({
        type: "dice",
        count: Number(diceMatch[1]),
        sides: Number(diceMatch[2]),
        sign,
      });

      continue;
    }

    const number = Number(piece);

    if (!Number.isNaN(number)) {

      terms.push({
        type: "number",
        value: number * sign,
      });

      continue;
    }

    throw new Error(`${piece} を解析できません`);
  }

  return {
    terms,
    target,
  };
}