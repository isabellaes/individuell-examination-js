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
  const [actionStatus, setActionStatus] = useState<boolean | null>();

  const dispatch = useAppDispatch();
  const loggedInUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );
  const statusmessage = useSelector(
    (state: RootState) => state.post.statusMessage
  );
  const status = useSelector((state: RootState) => state.post.sucess);

  const allPosts = useSelector((state: RootState) => state.post.postsByUser);

  useEffect(() => {
    if (statusmessage) setStatusMessage(statusmessage);
  }, [statusmessage]);

  useEffect(() => {
    if (status) {
      setActionStatus(status);
    }
  }, [status]);

  useEffect(() => {
    if (allPosts) setPosts(allPosts);
  }, [allPosts]);

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [loggedInUser]);

  function handleDelete(id: number) {
    dispatch(fetchDeletePost(id.toString()));
    setTimeout(function () {
      toggleSnackbar();
    }, 500);
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
      setTimeout(function () {
        toggleSnackbar();
      }, 500);
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
      setTimeout(function () {
        toggleSnackbar();
      }, 500);
    }
  }

  function toggleSnackbar() {
    var x = document.getElementById("snackbar") as HTMLElement;
    if (actionStatus) {
      x.classList.toggle("sucess");
    } else {
      x.classList.toggle("error");
    }
    x.classList.toggle("show");
    setTimeout(function () {
      //clear and hide snackbar
      x.classList.toggle("show");
      if (x.classList.contains("sucess")) {
        x.classList.toggle("sucess");
      }
      if (x.classList.contains("error")) {
        x.classList.toggle("error");
      }
    }, 3000);
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
