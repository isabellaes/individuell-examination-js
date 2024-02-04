import { useEffect, useState } from "react";
import { Post } from "../types";
interface Props {
  post: Post;
}
const EditPostForm = (post: Props) => {
  const [editPost, setEditPost] = useState<Post>();
  useEffect(() => {
    if (post.post) {
      setEditPost(post.post);
    }
  }, []);
  function handleUpdateTitle(title: string) {
    if (editPost) {
      editPost.title = title;
    }
  }
  function handleUpdateBody(body: string) {
    if (editPost) {
      editPost.body = body;
    }
  }
  function handleSubmit() {}
  return (
    <form
      onSubmit={(e) => {
        e.currentTarget.preventDefault();
        handleSubmit();
      }}
    >
      <h1>Edit mode</h1>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={editPost?.title}
        onChange={(e) => handleUpdateTitle(e.currentTarget.value)}
      />
      <label htmlFor="body">Body:</label>
      <input
        type="text"
        id="body"
        value={editPost?.body}
        onChange={(e) => handleUpdateBody(e.currentTarget.value)}
      />
      <input type="submit" value={"save changes"}></input>
    </form>
  );
};

export default EditPostForm;
