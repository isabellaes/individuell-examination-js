import { useEffect, useState } from "react";
import { Post, User } from "../types";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../store/store";
import { fetchDeletePost, fetchUpdatePost } from "../store/postSlice";
import BlogPost from "../components/BlogPost";
import CreatePost from "../components/CreatePost";
import EditPostForm from "../components/EditPostForm";
import Profile from "../components/Profile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

const UserPage = () => {
  const [user, setUser] = useState<User | null>();
  const [createFormModalOpen, setCreateFormModalOpen] =
    useState<boolean>(false);
  const [editFormModalOpen, setEditFormModalOpen] = useState<boolean>(false);
  const allPosts = useSelector((state: RootState) => state.post.postsByUser);
  const [editPost, setEditPost] = useState<Post>();
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    if (allPosts) setPosts(allPosts);
  }, [allPosts]);

  function handleDelete(id: number) {
    dispatch(fetchDeletePost(id.toString()));
  }

  function handleUpdateTitle(title: string) {
    if (editPost) {
      const updatedPost: Post = {
        id: editPost.id,
        body: editPost.body,
        title: title,
        userId: editPost.id,
      };

      setEditPost(updatedPost);
    }
  }
  function handleUpdateBody(body: string) {
    if (editPost) {
      const updatedPost: Post = {
        id: editPost.id,
        body: body,
        title: editPost.title,
        userId: editPost.id,
      };

      setEditPost(updatedPost);
    }
  }
  function handleSubmit() {
    if (editPost) {
      dispatch(fetchUpdatePost(editPost));
      setEditFormModalOpen(false);
    }
  }

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [loggedInUser]);

  return (
    <>
      <div className="layout">
        <main>
          <div className="flex-row">
            <h1>Your personal Blog!</h1>
            <AddIcon
              sx={{ cursor: "pointer", fontSize: "2em" }}
              onClick={() => setCreateFormModalOpen(true)}
            />
          </div>

          {posts?.map((post) => (
            <div className="row" key={post.id}>
              <BlogPost post={post} />
              <div className="buttons">
                <EditIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setEditPost(post);
                    setEditFormModalOpen(true);
                  }}
                />
                <DeleteOutlineIcon
                  sx={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(post.id)}
                />
              </div>
            </div>
          ))}
        </main>
        <aside>{user ? <Profile user={user} /> : <></>}</aside>
      </div>

      {editFormModalOpen && editPost ? (
        <EditPostForm
          title={editPost.title}
          body={editPost.body}
          handleUpdateTitle={handleUpdateTitle}
          handleUpdateBody={handleUpdateBody}
          handleSubmit={handleSubmit}
          onClose={() => setEditFormModalOpen(false)}
        />
      ) : (
        <></>
      )}

      {createFormModalOpen ? (
        <CreatePost onClose={() => setCreateFormModalOpen(false)} />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserPage;
