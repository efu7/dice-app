import { useState } from "react";
import { rollDice,type DiceResult } from "../utils/dice";
import { DiceResultCard } from "../components/Result";

function DicePage() {
  const [command, setCommand] = useState("");
  const [result, setResult] = useState<DiceResult | null>(null);

  const handleRoll = () => {
    try {
      const diceResult = rollDice(command);
      setResult(diceResult);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <h2>🎲 ダイスロール</h2>

      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="例：2d6+1d4-3"
      />

      <button onClick={handleRoll}>振る</button>

      {result && <DiceResultCard result={result} />}
    </div>
  );
}

export default DicePage;