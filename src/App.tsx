import { useState } from "react";

import Header from "./components/layout/Header";
import Tabs from "./components/layout/Tabs";
import Layout from "./components/layout/Layout";

import DicePage from "./pages/DicePage";
import SkillPage from "./pages/SkillPage";
import MyPage from "./pages/MyPages";

type Page = "dice" | "skill" | "mypage";

function App() {
  const [page, setPage] = useState<Page>("dice");

  return (
    <>
      <Header />

      <Tabs current={page} onChange={setPage} />

      <Layout>
        {page === "dice" && <DicePage />}
        {page === "skill" && <SkillPage />}
        {page === "mypage" && <MyPage />}
      </Layout>
    </>
  );
}

export default App;