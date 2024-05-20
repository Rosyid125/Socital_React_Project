import { useContext, useState, useEffect } from "react";
import "./dist/comments.css";
import { AuthContext } from "../../context/authContext";
import api from "../../pages/services/api";

const Comments = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const [comments, setComments] = useState([]);

  const [inputs, setInputs] = useState({
    comment: "",
  });

  const [err, setErr] = useState(null);

  const { postid } = post;

  useEffect(() => {
    const fetchPosts = async (postid) => {
      try {
        const response = await api.get(`/posts/${postid}/comments`);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(postid);
  }, [post]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleComment = async (postid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };

      const response = await api.post(`/posts/${postid}/comments/add`, inputs, { headers });
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeleteComment = async (postid, commentid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      const response = await api.delete(`/posts/${postid}/comments/${commentid}`, { headers });
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilepicture} alt="" />
        <input type="text" placeholder="write a comment" onChange={handleChange} name="comment" />
        <button onClick={() => handleComment(postid)}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.commentid}>
          <img src={comment.user.profilePicture} alt="" />
          <div className="info">
            <span>{comment.user.username}</span>
            <p>{comment.comment}</p>
          </div>
          <span className="date">{comment.datetime}</span>
          {currentUser.userid === comment.user.userid && <button onClick={() => handleDeleteComment(postid, comment.commentid)}>Delete</button>}
        </div>
      ))}
    </div>
  );
};

export default Comments;
