import { useEffect, useState } from "react";
import {
  rollDice,
  type DiceResult,
} from "../utils/dice";
import { DiceResultCard } from "../components/Result";

type HistoryItem = {
  command: string;
  result: DiceResult;
};

function DicePage() {
  const [command, setCommand] = useState("");
  const [result, setResult] =
    useState<DiceResult | null>(null);

  // ダイス履歴
  const [history, setHistory] =
    useState<HistoryItem[]>(() => {
      const saved = localStorage.getItem(
        "dice-roll-history"
      );

      if (!saved) {
        return [];
      }

      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    });

  // 履歴をLocalStorageに保存
  useEffect(() => {
    localStorage.setItem(
      "dice-roll-history",
      JSON.stringify(history)
    );
  }, [history]);

  // ダイスを振る
  const handleRoll = (rerollCommand?: string) => {
    const targetCommand =
      rerollCommand ?? command;

    if (!targetCommand.trim()) {
      return;
    }

    try {
      const diceResult = rollDice(targetCommand);

      setCommand(targetCommand);
      setResult(diceResult);

      // 履歴に追加
      setHistory((prev) => [
        {
          command: targetCommand.trim(),
          result: diceResult,
        },
        ...prev,
      ]);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // もう一度振る
  const handleReroll = () => {
    if (!command.trim()) {
      return;
    }

    handleRoll(command);
  };

  // 履歴から選択
  const handleSelectHistory = (
    item: HistoryItem
  ) => {
    setCommand(item.command);
    setResult(item.result);
  };

  // 履歴全削除
  const handleClearHistory = () => {
    if (
      !window.confirm(
        "ダイスロール履歴をすべて削除しますか？"
      )
    ) {
      return;
    }

    setHistory([]);
  };

  return (
    <div>
      <h2>🎲 ダイスロール</h2>

      {/* ====================
          ダイス入力
      ==================== */}
      <div>
        <input
          type="text"
          value={command}
          onChange={(e) =>
            setCommand(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRoll();
            }
          }}
          placeholder="例：2d6+1d4-3"
        />

        <button onClick={()=>handleRoll()}>
          🎲 振る
        </button>
      </div>

      {/* ====================
          判定結果
      ==================== */}
      {result && (
        <div
          style={{
            marginTop: "24px",
          }}
        >
          <DiceResultCard
            result={result}
            onReroll={() =>
              handleReroll()
            }
          />
        </div>
      )}

      {/* ====================
          ダイス履歴
      ==================== */}
      {history.length > 0 && (
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            margin: "24px auto 0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h3
              style={{
                margin: 0,
              }}
            >
              📜 ダイス履歴
            </h3>

            <button
              onClick={handleClearHistory}
            >
              🗑 全削除
            </button>
          </div>

          <div
            style={{
              maxHeight: "250px",
              overflowY: "auto",
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "0 12px",
            }}
          >
            {history.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  handleSelectHistory(item)
                }
                style={{
                  marginBottom:"8px",
                  border:"1px solid #eee",
                  borderRadius:"10px",
                  padding: "12px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontWeight:"bolder",
                    fontSize:"15px",
                  }}
                >
                  <strong>
                    🎲{item.command}
                  </strong>
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    fontSize:"14px",
                    opacity: 0.7,
                  }}
                >
                  総合計：{item.result.total}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DicePage;