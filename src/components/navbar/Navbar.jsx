import React, { useState, useEffect, useContext } from "react";
import "./dist/navbar.css";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Notifications from "../notifications/Notifications";
import api from "../../pages/services/api";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userid = currentUser.userid;
        const response = await api.get(`/users/${userid}`);
        setUserInfo(response.data.user[0]);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [currentUser.userid]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await api.get(`/users/search/${searchInput}`);
        if (response.data.users.length === 0) {
          return;
        }
        setSearchResults(response.data.users);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Socital</span>
        </Link>
      </div>
      <div className="search">
        <SearchOutlinedIcon />
        <input autoComplete="off" type="text" placeholder="Search for users..." value={searchInput} onChange={handleChange} onKeyPress={handleKeyPress} />
      </div>
      <div className="right">
        <div className="notificationIcon">
          {showNotifications ? <NotificationsOutlinedIcon onClick={toggleNotifications} /> : <NotificationsIcon onClick={toggleNotifications} />}
          {showNotifications && <Notifications />}
        </div>
        <div className="user">
          <img src={userInfo.profilepicture} alt={userInfo.username} />
          <Link to={`/profile/${userInfo.userid}`} style={{ textDecoration: "none", color: "inherit" }}>
            <span>{userInfo.username}</span>
          </Link>
        </div>
      </div>
      {/* Popup to display search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((user) => (
            <div key={user.userid} className="search-result">
              <img src={user.profilepicture} alt={user.username} />
              <Link to={`/profile/${user.userid}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span onClick={() => setSearchResults([])}>{user.username}</span>
              </Link>
              <div className="user-info">
                <span className="followers">Followers: {user.followers}</span>
                <span className="following">Following: {user.followings}</span>
              </div>
            </div>
          ))}
          <button className="close-button" onClick={() => setSearchResults([])}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
