import { useEffect, useState } from "react";
import { Post, User } from "../types";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../store/store";
import {
  fetchCreatePost,
  fetchDeletePost,
  fetchUpdatePost,
} from "../store/postSlice";
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
  const [editPost, setEditPost] = useState<Post>();
  const [posts, setPosts] = useState<Post[]>();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const dispatch = useAppDispatch();
  const loggedInUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );
  const statusmessage = useSelector(
    (state: RootState) => state.post.statusMessage
  );

  const allPosts = useSelector((state: RootState) => state.post.postsByUser);

  useEffect(() => {
    if (statusmessage) setStatusMessage(statusmessage);
  }, [statusmessage]);

  useEffect(() => {
    if (allPosts) setPosts(allPosts);
  }, [allPosts]);

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [loggedInUser]);

  function handleDelete(id: number) {
    if (
      window.confirm(
        "This action is irreversibel! Are you sure you want to delete this post?"
      )
    ) {
      dispatch(fetchDeletePost(id.toString()));
    }
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
  function handleSubmitEditForm() {
    if (editPost) {
      dispatch(fetchUpdatePost(editPost));
      setEditFormModalOpen(false);
    }
  }

  function handleSubmitCreateForm() {
    if (body && title && user) {
      const newPost: Post = {
        id: Date.now(),
        body: body,
        title: title,
        userId: user.id,
      };

      dispatch(fetchCreatePost(newPost));
      setCreateFormModalOpen(false);
    }
  }

  return (
    <>
      <div className="layout">
        <main>
          <div className="row-spacebetween">
            <h1>Your personal Blog!</h1>
            <AddIcon
              sx={{ cursor: "pointer", fontSize: "2em" }}
              onClick={() => setCreateFormModalOpen(true)}
            />
          </div>

          <aside className="mobile">
            {user ? <Profile user={user} /> : <></>}
          </aside>

          {posts?.map((post) => (
            <div className="row-center" key={post.id}>
              <BlogPost post={post} />

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
          ))}
        </main>
        <aside className="desktop">
          {user ? <Profile user={user} /> : <></>}
        </aside>
      </div>
      <div id="snackbar">{statusMessage}</div>

      {editFormModalOpen && editPost ? (
        <EditPostForm
          title={editPost.title}
          body={editPost.body}
          handleUpdateTitle={handleUpdateTitle}
          handleUpdateBody={handleUpdateBody}
          handleSubmit={handleSubmitEditForm}
          onClose={() => setEditFormModalOpen(false)}
        />
      ) : (
        <></>
      )}

      {createFormModalOpen ? (
        <CreatePost
          setBody={setBody}
          setTitle={setTitle}
          handleSubmit={handleSubmitCreateForm}
          onClose={() => setCreateFormModalOpen(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserPage;
