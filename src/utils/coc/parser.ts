import type { CocCommand } from "./types";

export function parseCoc(command: string): CocCommand {

  command = command.trim().toUpperCase();

  const match = command.match(/^CCB<=([0-9]+)$/);

  if (!match) {
    throw new Error("CCB形式ではありません");
  }

  return {
    type: "ccb",
    target: Number(match[1]),
  };
}