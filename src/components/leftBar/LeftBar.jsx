import "./dist/leftBar.css";
import LogoutIcon from "../../assets/14.png";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "../../assets/15.png";

const LeftBar = () => {
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <img src={EditIcon} alt="Edit" />
            <Link to={`/profile/edit`} style={{ textDecoration: "none", color: "inherit" }}>
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Other</span>
          <div className="item">
            <img src={LogoutIcon} alt="Logout" />
            <a onClick={handleLogout}>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
