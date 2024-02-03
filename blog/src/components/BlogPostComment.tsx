import { PostComment } from "../types";

interface Props {
  comment: PostComment;
}

const BlogPostComment = (comment: Props) => {
  return (
    <div className="blogpost-comment">
      <p>{comment.comment.body}</p>
      <p>{comment.comment.name}</p>
    </div>
  );
};

export default BlogPostComment;
