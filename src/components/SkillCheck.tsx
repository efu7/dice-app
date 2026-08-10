import { useState } from "react";
import { rollDice } from "../utils/dice";

function SkillCheck() {
  const [skillName, setSkillName] = useState("");
  const [skillValue, setSkillValue] = useState(50);
  const [result, setResult] = useState("");

  const checkSkill = () => {
    const dice = rollDice("1d100");

    const value = dice.total;

    if (value <= skillValue) {
      setResult(
        `${skillName}
出目：${value}
成功！`
      );
    } else {
      setResult(
        `${skillName}
出目：${value}
失敗...`
      );
    }
  };

  return (
    <div>
      <h2>技能判定</h2>

      <input
        placeholder="技能名"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
      />

      <input
        type="number"
        value={skillValue}
        onChange={(e) =>
          setSkillValue(Number(e.target.value))
        }
      />

      <button onClick={checkSkill}>
        判定
      </button>

      <pre>{result}</pre>
    </div>
  );
}

export default SkillCheck;