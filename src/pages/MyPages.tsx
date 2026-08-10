import type { Character } from "../utils/coc";

type Props = {
  characters: Character[];
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
};

function MyPages({
  characters,
  selectedCharacter,
  onSelectCharacter,
}: Props) {
  return (
    <div>
      <h2>👤 マイページ</h2>

      <h3>登録キャラクター</h3>

      {characters.map((character) => (
        <div key={character.id}>
          <h3>{character.name}</h3>

          {character.sheetUrl && (
            <p>
              <a
                href={character.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                キャラシを開く
              </a>
            </p>
          )}

          <p>
            技能数：{character.skills.length}
          </p>

          <div>
            {character.skills.map((skill) => (
              <span key={skill.name}>
                {skill.name}：{skill.value}　
              </span>
            ))}
          </div>

          <button
            onClick={() => onSelectCharacter(character)}
          >
            このキャラを使う
          </button>

          {selectedCharacter?.id === character.id && (
            <p>✅ 現在使用中</p>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default MyPages;