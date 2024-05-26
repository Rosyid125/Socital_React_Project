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

  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showFollowingsPopup, setShowFollowingsPopup] = useState(false);
  const [showFollowersPopup, setShowFollowersPopup] = useState(false);

  const [followingLength, setFollowingLength] = useState(0);
  const [followersLength, setFollowersLength] = useState(0);

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

        setFollowStatus(response.data.followed);
        setFollowId(response.data.followid);
      } catch (error) {
        console.error("Error fetching Follows:", error);
        setErr(error.message);
      }
    };

    fetchFollowStatusandFollowId();
  }, [userid]);

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const responseFollowings = await api.get(`/follows/${userid}/followings`);
        const responseFollowers = await api.get(`/follows/${userid}/followers`);
        setFollowing(responseFollowings.data.following);
        setFollowers(responseFollowers.data.followers);
        setFollowingLength(responseFollowings.data.following.length);
        setFollowersLength(responseFollowers.data.followers.length);
      } catch (error) {
        console.error("Error fetching Follows:", error);
        setErr(error.message);
      }
    };

    fetchFollows();
  }, [userid]);

  const handleFollow = async (userid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      const response = await api.post(`/follows/${userid}`, {}, { headers });
      if (response.status === 200) {
        setFollowId(response.data.following[0].followid);
        setFollowStatus(true);
        setFollowersLength(followersLength + 1);
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
        setFollowStatus(false);
        setFollowersLength(followersLength - 1);
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error(err.response.data);
      setErr(err.response.data.message);
    }
  };

  const toggleFollowingsPopup = () => {
    setShowFollowingsPopup(!showFollowingsPopup);
  };

  const toggleFollowersPopup = () => {
    setShowFollowersPopup(!showFollowersPopup);
  };

  const renderPopupFollowings = (data) => (
    <div className="popup">
      <div className="popup-inner">
        <div className="header">
          <h3>Followings</h3>
        </div>
        <ul>
          {data.map((user) => (
            <div className="follow" key={user.followid}>
              <img src={user.followed.profilepicture} alt={user.followed.username} />
              <div className="info">
                <span>{user.followed.username}</span>
              </div>
            </div>
          ))}
        </ul>
        <button onClick={() => setShowFollowingsPopup(false)}>Close</button>
      </div>
    </div>
  );

  const renderPopupFollowers = (data) => (
    <div className="popup">
      <div className="popup-inner">
        <div className="header">
          <h3>Followers</h3>
        </div>
        <ul>
          {data.map((user) => (
            <div className="follow" key={user.followid}>
              <img src={user.following.profilepicture} alt={user.following.username} />
              <div className="info">
                <span>{user.following.username}</span>
              </div>
            </div>
          ))}
        </ul>
        <button onClick={() => setShowFollowersPopup(false)}>Close</button>
      </div>
    </div>
  );

  return (
    <div className="profile">
      <div className="images">
        <img src={userInfo.profilepicture} alt={userInfo.username} className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
            <span>{userInfo.username}</span>
            <span className="email">{userInfo.email}</span>
            {userInfo.userid && userInfo.userid !== currentUser.userid && (
              <div className="buttons">
                <button className={followStatus ? "unfollowButton" : "followButton"} onClick={() => (followStatus ? handleUnfollow(followId) : handleFollow(userInfo.userid))}>
                  {followStatus ? "Unfollow" : "Follow"}
                </button>
              </div>
            )}
            <div className="followingsFollowers">
              <span onClick={toggleFollowingsPopup}>Followings: {followingLength}</span>
              <span onClick={toggleFollowersPopup}>Followers: {followersLength}</span>
            </div>
          </div>
          <div className="bottom">
            <div className="bio">
              <span>{userInfo.bio ? userInfo.bio : <span className="noBio">No bio</span>}</span>
            </div>
          </div>
        </div>
        <Posts />
        {showFollowingsPopup && renderPopupFollowings(following)}
        {showFollowersPopup && renderPopupFollowers(followers)}
      </div>
    </div>
  );
};

export default Profile;
