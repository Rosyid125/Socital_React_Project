import "./dist/rightBar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../pages/services/api";

import React, { useState, useEffect } from "react";

const RightBar = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [err, setErr] = useState(null);
  const [followid, setFollowId] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const userid = currentUser.userid;

    const fetchFollows = async () => {
      try {
        const responseFollowings = await api.get("/follows/{userid}/followings".replace("{userid}", userid));
        const responseFollowers = await api.get("/follows/{userid}/followers".replace("{userid}", userid));
        setFollowing(responseFollowings.data.following);
        setFollowers(responseFollowers.data.followers);
        setFollowId(responseFollowings.data.followid);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchFollows();
  }, []);

  const handleFollow = async (userid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      console.log(headers);
      const response = await api.post("/follows/{userid}".replace("{userid}", userid), {}, { headers });
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleUnfollow = async (followid) => {
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      console.log(headers);
      const response = await api.delete("/follows/{followid}".replace("{followid}", followid), { headers }); // ternyata kalau delete itu di pass ke second parmeter
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const combinedData = following.map((user, index) => ({
    ...user,
    followid: followid[index].followid,
  }));

  console.log(combinedData);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Followings</span>
          {combinedData.map((user) => (
            <div className="user" key={user.userid}>
              <div className="userInfo">
                <img src={user.profilepicture} alt={user.username} />
                <span>{user.username}</span>
              </div>
              <div className="unFollowButton">
                <button onClick={() => handleUnfollow(user.followid)}>unfollow</button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Followers</span>
          {followers.map((user) => (
            <div className="user" key={user.userid}>
              <div className="userInfo">
                <img src={user.profilepicture} alt={user.username} />
                <span>{user.username}</span>
              </div>
              <div className="followButton">
                <button onClick={() => handleFollow(user.userid)}>follow</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
