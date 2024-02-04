import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/main.scss";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import Profile from "./components/Profile";
import Posts from "./components/UsersPosts";
import CreatePost from "./components/CreatePost";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="user" element={<UserPage></UserPage>}>
            <Route path="profile/:Id" element={<Profile></Profile>}></Route>
            <Route path="posts/:Id" element={<Posts></Posts>}></Route>
            <Route
              path="create/:Id"
              element={<CreatePost></CreatePost>}
            ></Route>
          </Route>
          <Route path="blog/:Id" element={<BlogPage />} />
          <Route path="post/:Id" element={<PostPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
