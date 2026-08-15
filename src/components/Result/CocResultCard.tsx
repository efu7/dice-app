import type { CocResult } from "../../utils/coc";

type Props = {
  result: CocResult;
  onReroll?: () => void;
};

function CocResultCard({ result, onReroll }: Props) {
  const getRankText = () => {
    switch (result.rank) {
      case "critical":
        return "🌟 クリティカル";
      case "extreme":
        return "✨ イクストリーム成功";
      case "hard":
        return "💪 ハード成功";
      case "success":
        return "🎉 成功";
      case "failure":
        return "❌ 失敗";
      case "fumble":
        return "💀 ファンブル";
      default:
        return "判定結果";
    }
  };

  const getDescription = () => {
    switch (result.rank) {
      case "critical":
        return "クリティカル成功！";
      case "extreme":
        return "イクストリーム成功！";
      case "hard":
        return "ハード成功！";
      case "success":
        return "判定に成功しました。";
      case "failure":
        return "判定に失敗しました。";
      case "fumble":
        return "ファンブル！";
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "480px",
        boxSizing: "border-box",
        border: "1px solid #ccc",
        borderRadius: "16px",
        padding: "30px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* タイトル */}
      <p
        style={{
          margin: "0 0 8px",
          fontSize: "14px",
          opacity: 0.6,
        }}
      >
        🎲 判定結果
      </p>

      {/* コマンド */}
      <p
        style={{
          margin: "0 0 20px",
          fontSize: "14px",
        }}
      >
        {result.command}
      </p>

      {/* 出目 */}
      <div>
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            opacity: 0.6,
          }}
        >
          出目
        </p>

        <p
          style={{
            margin: "4px 0 20px",
            fontSize: "64px",
            fontWeight: "bold",
          }}
        >
          {result.roll}
        </p>
      </div>

      {/* 技能値 */}
      <p
        style={{
          margin: "0 0 20px",
          fontSize: "18px",
        }}
      >
        技能値：<strong>{result.target}</strong>
      </p>

      <hr />

      {/* 判定結果 */}
      <h2
        style={{
          margin: "20px 0 8px",
        }}
      >
        {getRankText()}
      </h2>

      <p
        style={{
          margin: 0,
          opacity: 0.8,
        }}
      >
        {getDescription()}
      </p>

      {/* もう一度振る */}
      {onReroll && (
        <button
          onClick={onReroll}
          style={{
            marginTop: "24px",
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

export default CocResultCard;