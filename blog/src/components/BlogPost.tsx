import { Post } from "../types";

interface Props {
  post: Post;
}

const BlogPost = (props: Props) => {
  return (
    <div className="blogPost">
      <h1>{props.post.title}</h1>
      <p>{props.post.body}</p>
    </div>
  );
};

export default BlogPost;
