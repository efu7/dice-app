import { useState } from "react";

import Header from "./components/layout/Header";
import Tabs from "./components/layout/Tabs";
import Layout from "./components/layout/Layout";

import DicePage from "./pages/DicePage";
import SkillPage from "./pages/SkillPage";
import MyPages from "./pages/MyPages";

import type { Character } from "./utils/coc";
import { sampleCharacters } from "./utils/coc";

type Page = "dice" | "skill" | "mypage";

function App() {
  const [page, setPage] = useState<Page>("dice");

  const updateCharacter = (
  updatedCharacter: Character
) => {
  setCharacters((prev) =>
    prev.map((character) =>
      character.id === updatedCharacter.id
        ? updatedCharacter
        : character
    )
  );

  setSelectedCharacter((current) =>
    current?.id === updatedCharacter.id
      ? updatedCharacter
      : current
  );
};

  // 登録されているキャラクター
  const [characters, setCharacters] =
    useState<Character[]>(sampleCharacters);

  // 現在使用しているキャラクター
  const [selectedCharacter, setSelectedCharacter] =
    useState<Character | null>(sampleCharacters[0]);

  // キャラクターを追加
  const handleAddCharacter = (character: Character) => {
    setCharacters((prev) => [...prev, character]);
  };

  // キャラクターを削除
  const handleDeleteCharacter = (id: string) => {
    setCharacters((prev) =>
      prev.filter((character) => character.id !== id)
    );

    // 使用中のキャラクターを削除した場合
    if (selectedCharacter?.id === id) {
      setSelectedCharacter(null);
    }
  };

  return (
    <>
      <Header />

      <Tabs
        current={page}
        onChange={setPage}
      />

      <Layout>
        {page === "dice" && <DicePage />}

        {page === "skill" && (
          <SkillPage
            character={selectedCharacter}
          />
        )}

        {page === "mypage" && (
        <MyPages
          characters={characters}
          selectedCharacter={selectedCharacter}
          onSelectCharacter={setSelectedCharacter}
          onAddCharacter={handleAddCharacter}
          onDeleteCharacter={handleDeleteCharacter}
          onUpdateCharacter={updateCharacter}
        />
        )}
      </Layout>
    </>
  );
}

export default App;