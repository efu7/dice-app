import { useState } from "react";
import type { Character } from "../utils/coc";
import SkillEditor from "../components/SkillEditor";
import CharacterEditor from "../components/CharacterEditor";
import {
  isIacharaUrl,
  getIacharaCharacterId,
} from "../utils/coc";

type Props = {
  characters: Character[];
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
  onAddCharacter: (character: Character) => void;
  onDeleteCharacter: (id: string) => void;
  onUpdateCharacter: (character: Character) => void;
};

function MyPages({
  characters,
  selectedCharacter,
  onSelectCharacter,
  onAddCharacter,
  onDeleteCharacter,
  onUpdateCharacter,
}: Props) {
  const [showForm, setShowForm] = useState(false);

  const [editingCharacterId, setEditingCharacterId] =
    useState<string | null>(null);

  const [editingSkillCharacterId, setEditingSkillCharacterId] =
    useState<string | null>(null);

  const [mode, setMode] = useState<"manual" | "iachara">(
    "manual"
  );

  const [name, setName] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");

  const handleAdd = () => {
    // -------------------------
    // 手動登録
    // -------------------------
    if (mode === "manual") {
      if (!name.trim()) {
        alert("キャラクター名を入力してください");
        return;
      }

      const newCharacter: Character = {
        id: crypto.randomUUID(),
        name: name.trim(),
        sheetUrl: sheetUrl.trim() || undefined,
        source: "manual",
        skills: [],
      };

      onAddCharacter(newCharacter);

      setName("");
      setSheetUrl("");
      setShowForm(false);

      return;
    }

    // -------------------------
    // いあきゃら登録
    // -------------------------
    if (mode === "iachara") {
      if (!sheetUrl.trim()) {
        alert("いあきゃらのURLを入力してください");
        return;
      }

      if (!isIacharaUrl(sheetUrl.trim())) {
        alert(
          "正しいいあきゃらのURLを入力してください。\n例：https://iachara.com/view/123456"
        );
        return;
      }

      const characterId = getIacharaCharacterId(
        sheetUrl.trim()
      );

      if (!characterId) {
        alert("いあきゃらのキャラクターIDを取得できませんでした");
        return;
      }

      const newCharacter: Character = {
        id: crypto.randomUUID(),

        // APIから名前を取得できないため、
        // とりあえずIDを名前にする
        name: `いあきゃら #${characterId}`,

        sheetUrl: sheetUrl.trim(),
        source: "iachara",
        skills: [],
      };

      onAddCharacter(newCharacter);

      setName("");
      setSheetUrl("");
      setShowForm(false);

      return;
    }
  };

  const handleDelete = (character: Character) => {
    const confirmed = window.confirm(
      `「${character.name}」を削除しますか？`
    );

    if (!confirmed) {
      return;
    }

    onDeleteCharacter(character.id);
  };

  return (
    <div>
      <h2>👤 マイページ</h2>

      {/* キャラクター追加ボタン */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm
          ? "キャンセル"
          : "＋ キャラクター追加"}
      </button>

      {/* =========================
          登録フォーム
      ========================= */}
      {showForm && (
        <div>
          <h3>キャラクター登録</h3>

          {/* 登録方法 */}
          <div>
            <button
              onClick={() => setMode("manual")}
              disabled={mode === "manual"}
            >
              手動登録
            </button>

            <button
              onClick={() => setMode("iachara")}
              disabled={mode === "iachara"}
            >
              いあきゃら
            </button>
          </div>

          {/* =====================
              手動登録
          ===================== */}
          {mode === "manual" && (
            <>
              <div>
                <label>
                  キャラクター名
                  <br />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="例：探索者A"
                  />
                </label>
              </div>

              <div>
                <label>
                  キャラシURL（任意）
                  <br />
                  <input
                    type="url"
                    value={sheetUrl}
                    onChange={(e) =>
                      setSheetUrl(e.target.value)
                    }
                    placeholder="https://..."
                  />
                </label>
              </div>
            </>
          )}

          {/* =====================
              いあきゃら
          ===================== */}
          {mode === "iachara" && (
            <div>
              <label>
                いあきゃらのキャラクターシートURL
                <br />

                <input
                  type="url"
                  value={sheetUrl}
                  onChange={(e) =>
                    setSheetUrl(e.target.value)
                  }
                  placeholder="https://iachara.com/view/123456"
                />
              </label>

              <p>
                いあきゃらのURLを登録します。
                <br />
                現在はキャラクター情報を自動取得せず、
                URLのみ保存します。
              </p>
            </div>
          )}

          <button onClick={handleAdd}>
            登録する
          </button>
        </div>
      )}

      {/* =========================
          キャラクター一覧
      ========================= */}

      <h3>登録キャラクター</h3>

      {characters.length === 0 && (
        <p>
          登録されているキャラクターはいません。
        </p>
      )}

      {characters.map((character) => (
        <div
          key={character.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            backgroundColor: "#242e3fb4",
          }}
        >
          {/* キャラクター名 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h3 style={{ margin: 0 }}>
              👤 {character.name}
            </h3>

            {selectedCharacter?.id === character.id && (
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  backgroundColor: "#d1fae5",
                  color: "#15803d",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                ✅ 使用中
              </span>
            )}
          </div>

          {/* ここから下も全部このmapの中 */}

          {/* 登録元 */}
          {character.source === "iachara" && (
            <p>🔗 いあきゃら</p>
          )}

          {character.source === "manual" && (
            <p>📝 手動登録</p>
          )}

          {/* キャラシURL */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {character.sheetUrl && (
              <a
                href={character.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 キャラシを開く
              </a>
            )}

            <span>
              技能数：{character.skills.length}
            </span>
          </div>
          {/* キャラクター編集 */}
          <button
            onClick={() =>
              setEditingCharacterId(
                editingCharacterId === character.id
                  ? null
                  : character.id
              )
            }
          >
            {editingCharacterId === character.id
              ? "▲ キャラクター編集を閉じる"
              : "✏️ キャラクター編集"}
          </button>

          {/* 技能編集 */}
          <button
            onClick={() =>
              setEditingSkillCharacterId(
                editingSkillCharacterId === character.id
                  ? null
                  : character.id
              )
            }
          >
            {editingSkillCharacterId === character.id
              ? "▲ 技能編集を閉じる"
              : "▼ 技能を編集"}
          </button>

          {editingSkillCharacterId === character.id && (
            <SkillEditor
              character={character}
              onUpdate={onUpdateCharacter}
            />
          )}

          {editingCharacterId === character.id && (
            <CharacterEditor
              character={character}
              onUpdate={onUpdateCharacter}
              onClose={() => setEditingCharacterId(null)}
            />
          )}

          {/* 技能一覧 */}
          {character.skills.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              {character.skills.map((skill) => (
                <span
                  key={skill.name}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    backgroundColor: "#141a29c3",
                    fontSize: "14px",
                  }}
                >
                  {skill.name} {skill.value}
                </span>
              ))}
            </div>
          )}

          {/* ボタン */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <button
              onClick={() =>
                onSelectCharacter(character)
              }
            >
              このキャラを使う
            </button>

            <button
              onClick={() =>
                handleDelete(character)
              }
            >
              削除
            </button>
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default MyPages;