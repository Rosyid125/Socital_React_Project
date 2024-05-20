import "./dist/post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../pages/services/api";
import Likes from "../likes/Likes";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [likeOpen, setLikeOpen] = useState(false);
  const [err, setErr] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);

  const { currentUser } = useContext(AuthContext);

  //TEMPORARY

  const { user, datetime, content, postpicture, likes, comments, postid } = post;

  useEffect(() => {
    const checkLiked = async (postid) => {
      try {
        const userid = currentUser.userid;

        const response = await api.get(`/posts/${postid}/likes/${userid}`);
        if (response.data.liked === true) {
          setLiked(true);
          setLikeId(response.data.likeid);
        } else {
          setLiked(false);
        }
      } catch (error) {
        console.error("Error checking if post is liked:", error);
      }
    };
    checkLiked(postid);
  }, []);

  const handleEdit = () => {
    // Logika untuk mengedit pos
    console.log("Edit post");
  };

  const handleDelete = async (postid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      console.log(headers);
      const response = await api.delete(`/posts/${postid}/delete`, { headers }); // ternyata kalau delete itu di pass ke second parmeter
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleLike = async (postid) => {
    try {
      // Send a POST request to like the post
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };

      const response = await api.post(`/posts/${postid}/likes/like`, {}, { headers });
      if (response.status === 200) {
        setLiked(true);
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async (postid, likeid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      // Send a DELETE request to unlike the post
      const response = await api.delete(`/posts/${postid}/likes/${likeid}`, { headers });
      if (response.status === 200) {
        setLiked(false);
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleLikeClick = () => {
    setLikeOpen(!likeOpen);
    if (commentOpen) {
      setCommentOpen(false);
    }
  };

  const handleCommentClick = () => {
    setCommentOpen(!commentOpen);
    if (likeOpen) {
      setLikeOpen(false);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={user.profilepicture} alt="" />
            <div className="details">
              <Link to={`/profile/${user.userid}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">{user.username}</span>
              </Link>
              <span className="date">{datetime}</span>
            </div>
          </div>
          {currentUser && currentUser.userid === user.userid && (
            <div className="menu">
              <button>Edit</button>
              <button onClick={() => handleDelete(postid)}>Delete</button>
            </div>
          )}
        </div>
        <div className="content">
          <p>{content}</p>
          <img src={postpicture} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={() => (liked ? handleUnlike(postid, likeId) : handleLike(postid))}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
          </div>
          <div className="item" onClick={handleLikeClick}>
            {likes} Likes
          </div>
          <div className="item" onClick={handleCommentClick}>
            <TextsmsOutlinedIcon />
            {comments} Comments
          </div>
        </div>
        {likeOpen && <Likes post={post} />}
        {commentOpen && <Comments post={post} />}
      </div>
    </div>
  );
};

export default Post;
