import "./comments.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);

  const [desc, setDesc] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const makePost = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePic
              ? "/upload/" + currentUser.profilePic
              : "/default_profile_pic.jpg"
          }
          alt=""
        />
        <input
          type="text"
          name="desc"
          value={desc}
          placeholder="Write a comment"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button onClick={makePost}>Post</button>
      </div>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "Loading"
        : data.map((comment) => (
            <div key={comment.id} className="comment">
              <img
                src={
                  comment.profilePic
                    ? "/upload/" + comment.profilePic
                    : "/default_profile_pic.jpg"
                }
                alt=""
              />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <div className="date">{moment(comment.createdAt).fromNow()}</div>
            </div>
          ))}
    </div>
  );
};

export default Comments;
