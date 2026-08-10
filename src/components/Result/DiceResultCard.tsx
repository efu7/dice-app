import type{ DiceResult } from "../../utils/dice";

type Props = {
  result: DiceResult;
};

function DiceResultCard({ result }: Props) {
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
    </div>
  );
}

export default DiceResultCard;