import { useContext, useState, useEffect } from "react";
import "./dist/likes.css";
import { AuthContext } from "../../context/authContext";
import api from "../../pages/services/api";

const Likes = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const [likes, setLikes] = useState([]);

  const [err, setErr] = useState(null);

  const { postid } = post;

  useEffect(() => {
    const fetchLikes = async (postid) => {
      try {
        const response = await api.get(`/posts/${postid}/likes`);
        setLikes(response.data.likedby);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchLikes(postid);
  }, [post]);

  return (
    <div className="likes">
      <p>Likedby</p>
      {likes.map((likedby) => (
        <div className="like" key={likedby.user.userid}>
          <img src={likedby.user.profilePicture} alt="" />
          <div className="info">
            <span>{likedby.user.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Likes;
