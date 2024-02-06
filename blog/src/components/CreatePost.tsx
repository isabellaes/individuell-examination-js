import { useEffect, useState } from "react";
import { Post, User } from "../types";
import { RootState, useAppDispatch } from "../store/store";
import { fetchCreatePost } from "../store/postSlice";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [user, setUser] = useState<User | null>();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  function handleSubmit() {
    if (body && title && user) {
      const newPost: Post = {
        id: Date.now(),
        body: body,
        title: title,
        userId: user.id,
      };

      dispatch(fetchCreatePost(newPost));
    }
  }
  return (
    <div className="create-component">
      <h1>Create Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <label htmlFor="body">Body:</label>
        <input
          type="text"
          id="body"
          onChange={(e) => setBody(e.currentTarget.value)}
        />
        <input type="submit" value={"Create"}></input>
      </form>
      <a href="#">Close</a>
    </div>
  );
};

export default CreatePost;
