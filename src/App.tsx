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

  // 現在使用しているキャラクター
  const [selectedCharacter, setSelectedCharacter] =
    useState<Character | null>(sampleCharacters[0]);

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
            characters={sampleCharacters}
            selectedCharacter={selectedCharacter}
            onSelectCharacter={setSelectedCharacter}
          />
        )}
      </Layout>
    </>
  );
}

export default App;