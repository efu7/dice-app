import { useState } from "react";
import type { Character } from "../utils/coc";

type Props = {
  character: Character;
  onUpdate: (character: Character) => void;
  onClose: () => void;
};

function CharacterEditor({
  character,
  onUpdate,
  onClose,
}: Props) {
  const [name, setName] = useState(character.name);
  const [sheetUrl, setSheetUrl] = useState(
    character.sheetUrl ?? ""
  );

  const handleSave = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("キャラクター名を入力してください");
      return;
    }

    onUpdate({
      ...character,
      name: trimmedName,
      sheetUrl: sheetUrl.trim() || undefined,
    });

    onClose();
  };

  return (
    <div
      style={{
        marginTop: "15px",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h4>✏️ キャラクター編集</h4>

      {/* キャラクター名 */}
      <div style={{ marginBottom: "12px" }}>
        <label>
          キャラクター名
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "8px",
              marginTop: "4px",
            }}
          />
        </label>
      </div>

      {/* キャラシURL */}
      <div style={{ marginBottom: "12px" }}>
        <label>
          キャラシURL
          <br />
          <input
            type="url"
            value={sheetUrl}
            onChange={(e) =>
              setSheetUrl(e.target.value)
            }
            placeholder="https://..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "8px",
              marginTop: "4px",
            }}
          />
        </label>
      </div>

      {/* ボタン */}
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button onClick={handleSave}>
          💾 保存
        </button>

        <button onClick={onClose}>
          キャンセル
        </button>
      </div>
    </div>
  );
}

export default CharacterEditor;