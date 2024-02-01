import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { FetchAllPosts } from "./api";
function App() {
  const [posts, setPosts] = useState();
  FetchAllPosts();
  //Hämta user
  //lägg upp router baserat på inloggat läge eller ej
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage></HomePage>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
