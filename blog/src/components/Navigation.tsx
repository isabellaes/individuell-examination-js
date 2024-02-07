import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPage from "../pages/BlogPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import Footer from "./Footer";
import Header from "./Header";
import Profile from "./Profile";
import Posts from "./UsersPosts";
import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { fetchAllUsers } from "../store/userSlice";
import { fetchAllPosts } from "../store/postSlice";
import SearchResultsPage from "../pages/SearchResultsPage";

const Navigation = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="user" element={<UserPage></UserPage>}>
          <Route index element={<Posts></Posts>}></Route>
          <Route path="profile/:Id" element={<Profile></Profile>}></Route>
          <Route path="posts/:Id" element={<Posts></Posts>}></Route>
        </Route>
        <Route path="blog/:Id" element={<BlogPage />} />
        <Route path="search" element={<SearchResultsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Navigation;
