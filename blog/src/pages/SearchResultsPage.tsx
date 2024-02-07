import { useEffect, useState } from "react";
import { Post } from "../types";
import BlogPost from "../components/BlogPost";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const SearchResultsPage = () => {
  const [post, setPosts] = useState<Post[]>();
  const posts = useSelector((state: RootState) => state.search.posts);

  useEffect(() => {
    if (posts) setPosts(posts);
  }, [posts]);

  return (
    <div className="home-container">
      <main>
        <h1>Searchresult</h1>

        {posts.length ? (
          <ul>
            {post?.map((post) => (
              <li key={post.id}>
                <BlogPost post={post}></BlogPost>
              </li>
            ))}
          </ul>
        ) : (
          <p>No match found.</p>
        )}
      </main>
    </div>
  );
};

export default SearchResultsPage;
