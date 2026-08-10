import type { CocResult } from "../../utils/coc";

type Props = {
  result: CocResult;
};

function CocResultCard({ result }: Props) {
  return (
    <div>
      <h2>{result.command}</h2>

      <p>出目：{result.roll}</p>

      <p>技能値：{result.target}</p>

      <h2>
        {result.rank === "critical" && "🌟クリティカル"}
        {result.rank === "extreme" && "✨イクストリーム成功"}
        {result.rank === "hard" && "💪ハード成功"}
        {result.rank === "success" && "🎉成功"}
        {result.rank === "failure" && "❌失敗"}
        {result.rank === "fumble" && "💀ファンブル"}
      </h2>
    </div>
  );
}

export default CocResultCard;