import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/main.scss";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="blog/:Id" element={<BlogPage />} />
          <Route path="post/:Id" element={<PostPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
