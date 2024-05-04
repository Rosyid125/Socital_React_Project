import "./dist/share.css";
import Image from "../../assets/8.png";
import Video from "../../assets/9.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.auth.profilepicture} alt="" />
          <input type="text" placeholder={`What's on your mind for the next 24 hours ${currentUser.auth.username}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <img src={Video} alt="" />
                <span>Add Image or Video</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
