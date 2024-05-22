import "./dist/navbar.css";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Notifications from "../notifications/Notifications";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false); // State to manage showing/hiding notifications

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
        <input type="text" placeholder="Search for users..." />
      </div>
      <div className="right">
        <div className="notificationIcon">
          {/* Toggle Notifications */}
          {showNotifications ? <NotificationsOutlinedIcon onClick={toggleNotifications} /> : <NotificationsIcon onClick={toggleNotifications} />}
          {/* Render Notifications component if showNotifications is true */}
          {showNotifications && <Notifications />}
        </div>
        <div className="user">
          <img src={currentUser.profilepicture} alt="" />
          <span>{currentUser.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
