import "./dist/navbar.css";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Notifications from "../notifications/Notifications";
import api from "../../pages/services/api";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false); // State to manage showing/hiding notifications
  const [userInfo, setUserInfo] = useState({});

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
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserInfo();
  }, [currentUser.userid]);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Socital</span>
        </Link>
      </div>
      <div className="search">
        <SearchOutlinedIcon />
        <input autoComplete="off" type="text" placeholder="Search for users..." />
      </div>
      <div className="right">
        <div className="notificationIcon">
          {/* Toggle Notifications */}
          {showNotifications ? <NotificationsOutlinedIcon onClick={toggleNotifications} /> : <NotificationsIcon onClick={toggleNotifications} />}
          {/* Render Notifications component if showNotifications is true */}
          {showNotifications && <Notifications />}
        </div>
        <div className="user">
          <img src={userInfo.profilepicture} alt={userInfo.username} />
          <span>{userInfo.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
