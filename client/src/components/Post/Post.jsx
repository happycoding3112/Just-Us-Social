import "./post.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";

const Post = ({ post }) => {
  const [showComment, setShowComment] = useState(false);

  const liked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
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
            <MoreHorizIcon />
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <span>Likes</span>
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
        {showComment && <Comments />}
      </div>
    </div>
  );
};

export default Post;
