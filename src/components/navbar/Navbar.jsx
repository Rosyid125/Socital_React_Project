import "./dist/navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
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
        <HomeOutlinedIcon />
      </div>
      <div className="search">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="right">
        <div className="container">
          <EmailOutlinedIcon />
          <span className="comingSoon">Coming soon</span>
        </div>
        {/* Toggle Notifications */}
        <NotificationsOutlinedIcon onClick={toggleNotifications} />
        {/* Render Notifications component if showNotifications is true */}
        {showNotifications && <Notifications />}
        <div className="user">
          <img src={currentUser.profilepicture} alt="" />
          <span>{currentUser.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
