import "./dist/rightBar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../pages/services/api";

import React, { useState, useEffect } from "react";

const RightBar = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const userid = currentUser.userid;

    const fetchPosts = async () => {
      try {
        const responseFollowings = await api.get("/follows/{userid}/followings".replace("{userid}", userid));
        const responseFollowers = await api.get("/follows/{userid}/followers".replace("{userid}", userid));
        setFollowing(responseFollowings.data.following);
        setFollowers(responseFollowers.data.followers);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [followers, following]);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Followings</span>
          {following.map((user) => (
            <div className="user" key={user.userid}>
              <div className="userInfo">
                <img src={user.profilepicture} alt={user.username} />
                <span>{user.username}</span>
              </div>
              <div className="buttons">
                <button>follow</button>
                <button>unfollow</button>
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
              <div className="buttons">
                <button>follow</button>
                <button>unfollow</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
