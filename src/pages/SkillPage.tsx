import { useState } from "react";

import { executeCoc } from "../utils/coc";
import type { CocResult } from "../utils/coc";
import type { Character, CocSkill } from "../utils/coc";

import { CocResultCard } from "../components/Result";

type Props = {
  character: Character | null;
};

function SkillPage({ character }: Props) {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] =
    useState<CocSkill | null>(null);
  const [result, setResult] =
    useState<CocResult | null>(null);

  if (!character) {
    return (
      <div>
        <h2>🎯 技能判定</h2>
        <p>使用するキャラクターを選択してください。</p>
      </div>
    );
  }

  const filteredSkills = character.skills.filter((skill) =>
    skill.name.includes(search)
  );

  const handleJudge = (skill: CocSkill) => {
    try {
      const cocResult = executeCoc(
        `CCB<=${skill.value}`
      );

      setSelectedSkill(skill);
      setResult(cocResult);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <h2>🎯 技能判定</h2>

      <h3>
        使用キャラクター：{character.name}
      </h3>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="技能を検索..."
      />

      <div>
        {filteredSkills.map((skill) => (
          <div key={skill.name}>
            <span>
              {skill.name}：{skill.value}
            </span>

            <button
              onClick={() => handleJudge(skill)}
            >
              判定
            </button>
          </div>
        ))}
      </div>

      {selectedSkill && (
        <div>
          <h3>
            {selectedSkill.name}：
            {selectedSkill.value}
          </h3>
        </div>
      )}

      {result && (
        <CocResultCard result={result} />
      )}
    </div>
  );
}

export default SkillPage;