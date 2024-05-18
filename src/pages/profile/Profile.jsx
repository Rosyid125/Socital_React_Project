import "./dist/profile.css";

import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";

const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <div className="bio">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia perspiciatis maiores aspernatur? Aliquam dolorem laudantium accusamus doloremque provident quidem officia, aspernatur dolorum eius pariatur soluta nihil quas eum,
                omnis vero!
              </span>
            </div>
          </div>
          <div className="center">
            <span>Jane Doe</span>
            <div className="buttons">
              <button>follow</button>
              <button>unfollow</button>
            </div>
          </div>
          <div className="right">
            <div className="container">
              <EmailOutlinedIcon />
              <span className="comingSoon">Coming soon</span>
            </div>
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
