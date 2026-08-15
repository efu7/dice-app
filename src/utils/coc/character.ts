import type { CocSkill } from "./skills";

export type Character = {
  id: string;
  name: string;
  sheetUrl?: string;
  source?: "manual" | "iachara";
  skills: CocSkill[];
};

export const sampleCharacters: Character[] = [
  {
    id: "character-1",
    name: "探索者A",
    sheetUrl: "https://example.com/character/1",
    skills: [
      { name: "目星", value: 65 },
      { name: "聞き耳", value: 70 },
      { name: "図書館", value: 50 },
      { name: "回避", value: 40 },
      { name: "応急手当", value: 30 },
      { name: "コンピューター", value: 60 },
    ],
  },
  {
    id: "character-2",
    name: "探索者B",
    sheetUrl: "https://example.com/character/2",
    skills: [
      { name: "目星", value: 40 },
      { name: "聞き耳", value: 55 },
      { name: "図書館", value: 80 },
      { name: "回避", value: 60 },
      { name: "心理学", value: 70 },
      { name: "説得", value: 50 },
    ],
  },
];