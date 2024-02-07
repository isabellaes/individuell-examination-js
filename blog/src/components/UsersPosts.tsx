import { useState, useEffect } from "react";
import { Post } from "../types";
import BlogPost from "./BlogPost";
import { useSelector } from "react-redux";
import { fetchUpdatePost, fetchDeletePost } from "../store/postSlice";
import { useAppDispatch, RootState } from "../store/store";
import EditPostForm from "./EditPostForm";
import CreatePost from "./CreatePost";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>();
  const dispatch = useAppDispatch();
  const allPosts = useSelector((state: RootState) => state.post.postsByUser);
  const [editPost, setEditPost] = useState<Post>();

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
    }
  }

  return (
    <>
      <div id="edit">
        {editPost ? (
          <EditPostForm
            title={editPost.title}
            body={editPost.body}
            handleUpdateTitle={handleUpdateTitle}
            handleUpdateBody={handleUpdateBody}
            handleSubmit={handleSubmit}
          />
        ) : (
          <></>
        )}
      </div>
      <div id="create">
        <CreatePost></CreatePost>
      </div>
      <a href="#create">Create post</a>
      {posts?.map((post) => (
        <div key={post.id}>
          <BlogPost post={post} />
          <a href="#edit" onClick={() => setEditPost(post)}>
            Edit post
          </a>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Posts;
