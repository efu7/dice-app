import { useState } from "react";
import type { Character, CocSkill } from "../utils/coc";

type Props = {
  character: Character;
  onUpdate: (character: Character) => void;
};

// CoCの基本技能
const DEFAULT_SKILLS = [
  "回避",
  "キック",
  "組み付き",
  "こぶし",
  "頭突き",
  "投擲",
  "マーシャルアーツ",
  "拳銃",
  "サブマシンガン",
  "ショットガン",
  "マシンガン",
  "ライフル",
  "応急手当",
  "鍵開け",
  "隠す",
  "隠れる",
  "聞き耳",
  "忍び歩き",
  "写真術",
  "精神分析",
  "追跡",
  "登攀",
  "図書館",
  "目星",
  "運転",
  "機械修理",
  "重機械操作",
  "電気修理",
  "ナビゲート",
  "変装",
  "言いくるめ",
  "信用",
  "説得",
  "値切り",
  "母国語",
  "医学",
  "オカルト",
  "化学",
  "クトゥルフ神話",
  "芸術",
  "経理",
  "コンピューター",
  "心理学",
  "人類学",
  "生物学",
  "地質学",
  "電子工学",
  "博物学",
  "物理学",
  "法律",
  "薬学",
  "歴史",
  "外国語",
];

function SkillEditor({
  character,
  onUpdate,
}: Props) {
  const [skillName, setSkillName] = useState("");
  const [skillValue, setSkillValue] = useState("");

  const addSkill = () => {
    const name = skillName.trim();
    const value = Number(skillValue);

    if (!name) {
      alert("技能を選択してください");
      return;
    }

    if (
      skillValue === "" ||
      !Number.isInteger(value) ||
      value < 0 ||
      value > 100
    ) {
      alert("技能値は0～100の整数で入力してください");
      return;
    }

    const alreadyExists = character.skills.some(
      (skill) => skill.name === name
    );

    if (alreadyExists) {
      alert("その技能はすでに登録されています");
      return;
    }

    const newSkill: CocSkill = {
      name,
      value,
    };

    onUpdate({
      ...character,
      skills: [...character.skills, newSkill],
    });

    setSkillName("");
    setSkillValue("");
  };

  const deleteSkill = (skillName: string) => {
    if (
      !window.confirm(
        `「${skillName}」を削除しますか？`
      )
    ) {
      return;
    }

    onUpdate({
      ...character,
      skills: character.skills.filter(
        (skill) => skill.name !== skillName
      ),
    });
  };

  const updateSkill = (
    skillName: string,
    value: number
  ) => {
    onUpdate({
      ...character,
      skills: character.skills.map((skill) =>
        skill.name === skillName
          ? { ...skill, value }
          : skill
      ),
    });
  };

  return (
    <div>
      <h4>技能</h4>

      {character.skills.length === 0 && (
        <p>技能が登録されていません。</p>
      )}

      {character.skills.map((skill) => (
        <div key={skill.name}>
          <span>{skill.name}：</span>

          <input
            type="number"
            min="0"
            max="100"
            value={skill.value}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (
                Number.isInteger(value) &&
                value >= 0 &&
                value <= 100
              ) {
                updateSkill(skill.name, value);
              }
            }}
          />

          <button
            onClick={() =>
              deleteSkill(skill.name)
            }
          >
            削除
          </button>
        </div>
      ))}

      <hr />

      <h4>技能を追加</h4>

      <div>
        <input
          list="coc-skills"
          value={skillName}
          onChange={(e) =>
            setSkillName(e.target.value)
          }
          placeholder="技能名を入力・選択"
        />

       <datalist id="coc-skills">
  {DEFAULT_SKILLS
    .filter(
      (skill) =>
        !character.skills.some(
          (existingSkill) =>
            existingSkill.name === skill
        )
    )
    .map((skill) => (
      <option
        key={skill}
        value={skill}
      />
    ))}
</datalist>

        <input
          type="number"
          min="0"
          max="100"
          value={skillValue}
          onChange={(e) =>
            setSkillValue(e.target.value)
          }
          placeholder="技能値"
        />

        <button onClick={addSkill}>
          ＋ 追加
        </button>
      </div>
    </div>
  );
}

export default SkillEditor;