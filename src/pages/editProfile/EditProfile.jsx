import React, { useState, useContext } from "react";
import "./dist/editProfile.css"; // Import file CSS untuk styling
import api from "../../pages/services/api";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import UserProfilePicture from "../../assets/16.jpg";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [err, setErr] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    prevpassword: "",
    newpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username === "" && formData.email === "" && formData.newpassword === "" && formData.prevpassword === "" && formData.bio === "") {
      setErr("Fill at least 1 field or both fields on password if you want to change password");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
      };
      const response = await api.patch(`/users/edit`, formData, { headers });
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErr(response.message);
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <h2>Edit Profile and Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" id="file" className="file-input" />
          <label htmlFor="file" className="file-label">
            <div className="item file-container">
              <img src={UserProfilePicture} alt="" />
              <span>Edit Your Profile Picture</span>
            </div>
          </label>
          <input autoComplete="off" type="text" placeholder="Change Username" onChange={handleChange} name="username" value={formData.username} />
          <input autoComplete="off" type="text" placeholder="Change Email" onChange={handleChange} name="email" value={formData.email} />
          <input autoComplete="off" type="text" placeholder="Edit Bio" onChange={handleChange} name="bio" value={formData.bio} />
          <p>Change Password</p>
          <input autoComplete="off" type="password" placeholder="Previous Password" onChange={handleChange} name="prevpassword" value={formData.prevpassword} />
          <input autoComplete="off" type="password" placeholder="New Password" onChange={handleChange} name="newpassword" value={formData.newpassword} />
          {err && <p>{err.message || err || err.message.email[0]}</p>}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
