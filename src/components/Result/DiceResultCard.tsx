import type { DiceResult } from "../../utils/dice";

type Props = {
  result: DiceResult;
  onReroll?: () => void;
};

function DiceResultCard({
  result,
  onReroll
}: Props) {
  return (
    <div>
      <h2>{result.command}</h2>

      {result.details.map((detail, index) => (
        <div key={index}>
          <h3>
            {detail.count}d{detail.sides}
          </h3>

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

      <h2>総合計：{result.total}</h2>


      {/* もう一度振る */}
      {onReroll && (
        <button
          onClick={onReroll}
          style={{
            marginTop: "20px",
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          🎲 もう一度振る
        </button>
      )}
    </div>
  );
}

export default DiceResultCard;