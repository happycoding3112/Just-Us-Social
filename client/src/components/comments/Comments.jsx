import "./comments.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Comment from "../comment/Comment";

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
        <img src={currentUser.profilePic} alt="" />
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
        : data.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
};

export default Comments;
