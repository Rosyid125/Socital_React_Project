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
import Image from "../../assets/8.png";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [likeOpen, setLikeOpen] = useState(false);
  const [err, setErr] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { user, datetime, content, postpicture, likes, comments, postid } = post;

  const [editedPostPicture, setEditedPostPicture] = useState(null);

  const [editInputs, setEditInputs] = useState({
    content: "",
    postpicture: null,
  });

  const handleChange = (e) => {
    setEditInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditFileChange = (e) => {
    setEditInputs((prevState) => ({
      ...prevState,
      postpicture: e.target.files[0],
    }));

    // Display the selected image
    setEditedPostPicture(URL.createObjectURL(e.target.files[0]));
  };

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

  const handleEdit = async (postid) => {
    if (editInputs.content === "" && editInputs.postpicture === null) {
      setErr("You tried to post nothing, that's a no no!");
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };

      const inputsToSend = new FormData();
      Object.keys(editInputs).forEach((key) => {
        inputsToSend.append(key, editInputs[key]);
      });

      const response = await api.post(`/posts/${postid}/edit`, inputsToSend, { headers });

      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleDelete = async (postid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
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

  const openEditPopup = () => {
    setEditOpen(true);
  };

  const closeEditPopup = () => {
    setEditOpen(false);
  };

  const renderPopupEdit = (postid) => (
    <div className="edit-popup">
      <div className="edit-popup-inner">
        <h2>Edit Post</h2>
        <input type="text" placeholder="Edit text content" onChange={handleChange} name="content" />
        {editedPostPicture && <img src={editedPostPicture} alt="EditedPostPic" />}
        <input type="file" id="editfile" className="file-input" name="postpicture" onChange={handleEditFileChange} />
        <label htmlFor="editfile" className="file-label">
          <div className="item file-container">
            <img src={Image} alt="" />
            <span>Edit Picture</span>
          </div>
        </label>
        <button type="submit" onClick={() => handleEdit(postid)}>
          Save Changes
        </button>
        <button type="button" onClick={closeEditPopup}>
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={user.profilepicture} alt={user.username} />
            <div className="details">
              <Link to={`/profile/${user.userid}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">{user.username}</span>
              </Link>
              <span className="date">{datetime}</span>
            </div>
          </div>
          {currentUser && currentUser.userid === user.userid && (
            <div className="menu">
              <button onClick={openEditPopup}>Edit</button>
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
        {editOpen && renderPopupEdit(postid)}
      </div>
    </div>
  );
};

export default Post;
