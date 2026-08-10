type Props = {
  current: "dice" | "skill" | "mypage";
  onChange: (page: "dice" | "skill" | "mypage") => void;
};

function Tabs({ current, onChange }: Props) {
  return (
    <nav className="tabs">
      <button
        className={current === "dice" ? "active" : ""}
        onClick={() => onChange("dice")}
      >
        🎲 ダイスロール
      </button>

      <button
        className={current === "skill" ? "active" : ""}
        onClick={() => onChange("skill")}
      >
        🎯 技能判定
      </button>

      <button
        className={current === "mypage" ? "active" : ""}
        onClick={() => onChange("mypage")}
      >
        👤 マイページ
      </button>
    </nav>
  );
}

export default Tabs;