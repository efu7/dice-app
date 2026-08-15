import { useEffect, useState } from "react";

import { executeCoc } from "../utils/coc";
import type { CocResult } from "../utils/coc";
import type { Character, CocSkill } from "../utils/coc";

import { CocResultCard } from "../components/Result";

type Props = {
  character: Character | null;
};

type HistoryItem = {
  skill: CocSkill;
  result: CocResult;
};

function SkillPage({ character }: Props) {
  const [search, setSearch] = useState("");

  const [selectedSkill, setSelectedSkill] =
    useState<CocSkill | null>(null);

  const [result, setResult] =
    useState<CocResult | null>(null);

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  const [historyCharacterId, setHistoryCharacterId] =
    useState<string | null>(null);

  // キャラクター変更時に履歴を読み込む
  useEffect(() => {
    if (!character) {
      setHistory([]);
      setHistoryCharacterId(null);
      setSelectedSkill(null);
      setResult(null);
      return;
    }

    const saved = localStorage.getItem(
      `coc-judge-history-${character.id}`
    );

    if (!saved) {
      setHistory([]);
    } else {
      try {
        const parsed: HistoryItem[] =
          JSON.parse(saved);

        setHistory(parsed);
      } catch {
        setHistory([]);
      }
    }

    setHistoryCharacterId(character.id);
    setSelectedSkill(null);
    setResult(null);
  }, [character]);

  // 履歴が変更されたら保存
  useEffect(() => {
    if (!historyCharacterId) {
      return;
    }

    localStorage.setItem(
      `coc-judge-history-${historyCharacterId}`,
      JSON.stringify(history)
    );
  }, [history, historyCharacterId]);

  if (!character) {
    return (
      <div>
        <h2>🎯 技能判定</h2>
        <p>
          使用するキャラクターを選択してください。
        </p>
      </div>
    );
  }

  const filteredSkills = character.skills.filter(
    (skill) =>
      skill.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleJudge = (skill: CocSkill) => {
    try {
      const cocResult = executeCoc(
        `CCB<=${skill.value}`
      );

      setSelectedSkill(skill);
      setResult(cocResult);

      setHistory((prev) => [
        {
          skill,
          result: cocResult,
        },
        ...prev,
      ]);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleReroll = () => {
    if (!selectedSkill) {
      return;
    }

    handleJudge(selectedSkill);
  };

  return (
    <div>
      <h2>🎯 技能判定</h2>

      <h3>
        使用キャラクター：{character.name}
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(280px, 40%) 1fr",
          gap: "24px",
          alignItems: "start",
          marginTop: "20px",
        }}
      >
        {/* ====================
            左：技能一覧
        ==================== */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3>🔎 技能一覧</h3>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="技能を検索..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "8px",
              marginBottom: "16px",
            }}
          />

          {filteredSkills.length === 0 ? (
            <p>
              {search
                ? "該当する技能がありません。"
                : "技能が登録されていません。"}
            </p>
          ) : (
            filteredSkills.map((skill) => (
              <div
                key={skill.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  padding: "10px 0",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                <span>
                  {skill.name}：{skill.value}
                </span>

                <button
                  onClick={() =>
                    handleJudge(skill)
                  }
                >
                  🎲 判定
                </button>
              </div>
            ))
          )}
        </div>

        {/* ====================
            右：判定結果
        ==================== */}
        <div
          style={{
            minHeight: "300px",
          }}
        >
          {/* 判定カード */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result && selectedSkill ? (
              <>
                <CocResultCard
                  result={result}
                  onReroll={handleReroll}
                />


              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  opacity: 0.6,
                }}
              >
                <p
                  style={{
                    fontSize: "48px",
                    margin: 0,
                  }}
                >
                  🎲
                </p>

                <p>
                  左側から技能を選択して
                  <br />
                  判定してください
                </p>
              </div>
            )}
          </div>

          {/* ====================
              判定履歴
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
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                  }}
                >
                  📜 判定履歴
                </h3>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "判定履歴をすべて削除しますか？"
                      )
                    ) {
                      setHistory([]);
                      setSelectedSkill(null);
                      setResult(null);
                    }
                  }}
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
                {history.map(
                  (item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedSkill(
                          item.skill
                        );
                        setResult(
                          item.result
                        );
                      }}
                      style={{
                        borderBottom:
                          "1px solid #eee",
                        padding: "10px 0",
                        cursor: "pointer",
                      }}
                    >
                      <span>
                        {item.skill.name}{" "}
                        {item.skill.value}
                      </span>

                      <span>
                        {" → "}
                        {item.result.roll}
                      </span>

                      <span>
                        {" "}
                        {item.result.rank ===
                          "critical" &&
                          "🌟"}

                        {item.result.rank ===
                          "extreme" &&
                          "✨"}

                        {item.result.rank ===
                          "hard" &&
                          "💪"}

                        {item.result.rank ===
                          "success" &&
                          "🎉"}

                        {item.result.rank ===
                          "failure" &&
                          "❌"}

                        {item.result.rank ===
                          "fumble" &&
                          "💀"}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillPage;