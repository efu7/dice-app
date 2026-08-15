import { parseCoc } from "./parser";
import { rollCoc } from "./roller";

export { sampleCharacters } from "./character";
export type { Character } from "./character";
export type { CocSkill } from "./skills";

export function executeCoc(command: string) {
  const parsed = parseCoc(command);

  return rollCoc(parsed, command);
}

export * from "./types";

export {
  isIacharaUrl,
  getIacharaCharacterId,
} from "./iachara";