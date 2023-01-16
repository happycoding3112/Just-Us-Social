import "./posts.scss";
import Post from "../Post/Post";
import posts from "../../post";

const Posts = () => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
