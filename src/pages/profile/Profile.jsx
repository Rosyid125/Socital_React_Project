import "./dist/profile.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Posts from "../../components/posts/Posts";
import api from "../../pages/services/api";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { userid } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [err, setErr] = useState(null);
  const [followStatus, setFollowStatus] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [followId, setFollowId] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/users/${userid}`);
        setUserInfo(response.data.user[0]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserInfo();
  }, [userid]);

  useEffect(() => {
    const fetchFollowStatusandFollowId = async () => {
      try {
        const response = await api.get(`/follows/${userid}/following/${currentUser.userid}`);

        setFollowStatus(response.data);
      } catch (error) {
        console.error("Error fetching Follows:", error);
        setErr(error.message);
      }
    };

    fetchFollowStatusandFollowId();
  }, [userid]);

  const handleFollow = async (userid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      const response = await api.post(`/follows/${userid}`, {}, { headers });
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error(err.response.data);
      setErr(err.response.data.message);
    }
  };

  const handleUnfollow = async (followid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      const response = await api.delete(`/follows/${followid}`, { headers });
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error(err.response.data);
      setErr(err.response.data.message);
    }
  };

  return (
    <div className="profile">
      <div className="images">
        <img src={userInfo.profilepicture} alt={userInfo.username} className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
            <span>{userInfo.username}</span>
            <div className="buttons">
              <button onClick={() => (followStatus.followed ? handleUnfollow(followStatus.followid) : handleFollow(userInfo.userid))}>{followStatus.followed ? "Unfollow" : "Follow"}</button>
            </div>
          </div>
          <div className="bottom">
            <div className="bio">
              <span>{userInfo.bio ? userInfo.bio : <span className="noBio">No bio</span>}</span>
            </div>
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
