import "./dist/share.css";
import Image from "../../assets/8.png";
import Video from "../../assets/9.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../pages/services/api";

const Share = () => {
  const [inputs, setInputs] = useState({
    content: "",
    postpicture: "",
  });

  const [err, setErr] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePost = async () => {
    try {
      if (inputs.content === "" && inputs.postpicture === "") {
        setErr("You tried to post nothing, that's a no no!");
        return;
      }

      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      const response = await api.post("/posts/create", inputs, { headers });
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilepicture} alt="" />
          <input type="text" placeholder={`What's on your mind for the next 24 hours ${currentUser.username}?`} name="content" onChange={handleChange} />
          {err && <p className="error">{err.message || err}</p>}
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <img src={Video} alt="" />
                <span>Add Media</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handlePost}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
