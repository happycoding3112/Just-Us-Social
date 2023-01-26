import "./comment.scss";
import moment from "moment";

const Comment = ({ comment }) => {
  return (
    <>
      <div className="comment">
        <img src={comment.profilePic} alt="" />
        <div className="info">
          <span>{comment.name}</span>
          <p>{comment.desc}</p>
        </div>
        <div className="date">{moment(comment.createdAt).fromNow()}</div>
      </div>
    </>
  );
};

export default Comment;
