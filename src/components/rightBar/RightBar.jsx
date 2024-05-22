import "./dist/rightBar.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../pages/services/api";
import React from "react";

const RightBar = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [err, setErr] = useState(null);
  const [followStatus, setFollowStatus] = useState({});

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const userid = currentUser.userid;

    const fetchFollows = async () => {
      try {
        const responseFollowings = await api.get(`/follows/${userid}/followings`);
        const responseFollowers = await api.get(`/follows/${userid}/followers`);
        setFollowing(responseFollowings.data.following);
        setFollowers(responseFollowers.data.followers);

        // Check follow status for each user in following and followers
        const followStatuses = {};
        const allUsers = [...responseFollowings.data.following, ...responseFollowers.data.followers];

        for (const user of allUsers) {
          const userIdToCheck = user.followed ? user.followed.userid : user.following.userid;
          const response = await api.get(`/follows/${userIdToCheck}/following/${userid}`);
          followStatuses[userIdToCheck] = response.data.followed;
        }

        setFollowStatus(followStatuses);
      } catch (error) {
        console.error("Error fetching Follows:", error);
        setErr(error.message);
      }
    };

    fetchFollows();
  }, [currentUser]);

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
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Following</span>
          {following.map((following) => (
            <div className="user" key={following.followed.userid}>
              <div className="userInfo">
                <img src={following.followed.profilepicture} alt={following.followed.username} />
                <span>{following.followed.username}</span>
              </div>
              <div className="followUnfollowButton">
                <button
                  className={followStatus[following.followed.userid] ? "unfollowButton" : "followButton"}
                  onClick={() => (followStatus[following.followed.userid] ? handleUnfollow(following.followid) : handleFollow(following.followed.userid))}
                >
                  {followStatus[following.followed.userid] ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Followers</span>
          {followers.map((follower) => (
            <div className="user" key={follower.following.userid}>
              <div className="userInfo">
                <img src={follower.following.profilepicture} alt={follower.following.username} />
                <span>{follower.following.username}</span>
              </div>
              <div className="followUnfollowButton">
                <button
                  className={followStatus[follower.following.userid] ? "unfollowButton" : "followButton"}
                  onClick={() => (followStatus[follower.following.userid] ? handleUnfollow(follower.followid) : handleFollow(follower.following.userid))}
                >
                  {followStatus[follower.following.userid] ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
