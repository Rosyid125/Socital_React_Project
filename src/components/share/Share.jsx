import "./dist/share.css";
import Image from "../../assets/8.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../pages/services/api";

const Share = () => {
  const [postPicture, setPostPicture] = useState(null);

  const [err, setErr] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    content: "",
    postpicture: null,
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      postpicture: e.target.files[0],
    }));

    // Display the selected image
    setPostPicture(URL.createObjectURL(e.target.files[0]));
  };

  const handlePost = async () => {
    if (inputs.content === "" && inputs.postpicture === null) {
      setErr("You tried to post nothing, that's a no no!");
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };

      const inputsToSend = new FormData();
      Object.keys(inputs).forEach((key) => {
        inputsToSend.append(key, inputs[key]);
      });

      const response = await api.post("/posts/create", inputsToSend, { headers });

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
          <input autoComplete="off" type="text" placeholder={`Write something you want to write?`} name="content" onChange={handleChange} />
        </div>
        <hr />
        {postPicture && <img src={postPicture} alt="PostPic" />}
        {err && <p className="error">{err.message || err}</p>}
        <div className="bottom">
          <div className="left">
            <input type="file" id="sharefile" style={{ display: "none" }} name="postpicture" onChange={handleFileChange} />
            <label htmlFor="sharefile">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Picture</span>
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
