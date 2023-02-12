import "./post.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ShareIcon from "@mui/icons-material/Share";
import Comments from "../comments/Comments";
import moment from "moment";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [showComment, setShowComment] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (postId) => makeRequest.delete("/posts/" + postId),
    {
      onSuccess: () => queryClient.invalidateQueries(["posts"]),
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate(data.includes(currentUser.id));
  };

  const deletePost = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                post.profilePic
                  ? "/upload/" + post.profilePic
                  : "/default_profile_pic.jpg"
              }
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="more">
            <MoreHorizIcon
              style={{ cursor: "pointer" }}
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && post.userId === currentUser.id && (
              <button onClick={deletePost}>Delete Post</button>
            )}
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleClick}>
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
            <span>{data?.length} Likes</span>
          </div>
          <div className="item" onClick={() => setShowComment(!showComment)}>
            <SmsOutlinedIcon />
            <span>Comments</span>
          </div>
          <div className="item">
            <ShareIcon />
            <span>Share</span>
          </div>
        </div>
        {showComment && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
