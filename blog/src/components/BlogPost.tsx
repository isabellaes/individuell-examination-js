import { Post } from "../types";

interface Props {
  post: Post;
}

const BlogPost = (post: Props) => {
  return (
    <div className="blogPost">
      <h1>{post.post.title}</h1>
      <p>{post.post.body}</p>
    </div>
  );
};

export default BlogPost;
