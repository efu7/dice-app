import { useState } from "react";
import { rollDice, type DiceResult } from "./utils/dice";

function App() {
  const [command, setCommand] = useState("");
  const [result, setResult] = useState<DiceResult | null>(null);

  const handleRoll = () => {
    try {
      const dice = rollDice(command);
      setResult(dice);
    } catch (e) {
      alert("ダイス形式が正しくありません");
    }
  };

  return (
    <div>
      <h1>🎲 Dice Roller</h1>

      <input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="例: 1d6+2d3+3"
      />

      <button onClick={handleRoll}>振る</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>{result.command}</h2>

          {result.details.map((detail, index) => (
            <div key={index}>
              <p>
                {detail.count}d{detail.sides}
              </p>

              <p>出目：{detail.rolls.join(", ")}</p>

              <p>合計：{detail.total}</p>

              <hr />
            </div>
          ))}

          {result.modifier !== 0 && (
            <p>
              補正：
              {result.modifier > 0 ? "+" : ""}
              {result.modifier}
            </p>
          )}

          <h3>総合計：{result.total}</h3>

          {result.success !== undefined && (
            <h2>{result.success ? "成功" : "失敗..."}</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default App;