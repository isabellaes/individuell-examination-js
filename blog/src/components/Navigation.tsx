import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../store/store";
import { fetchAllUsers } from "../store/userSlice";
import { fetchAllPosts } from "../store/postSlice";
import SearchResultsPage from "../pages/SearchResultsPage";
import { useSelector } from "react-redux";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      {loggedInUser ? (
        <>
          <Routes>
            <Route index element={<UserPage></UserPage>} />
            <Route path="/home" element={<HomePage />} />
            <Route path="search" element={<SearchResultsPage />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchResultsPage />} />
          </Routes>
        </>
      )}

      <Footer />
    </BrowserRouter>
  );
};

export default Navigation;
