import React, { useState, useContext } from "react";
import "./dist/editProfile.css";
import api from "../../pages/services/api";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); // State to hold profile picture

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    prevpassword: "",
    newpassword: "",
    profilepicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      profilepicture: e.target.files[0],
    }));

    // Display the selected image
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username === "" && formData.email === "" && formData.newpassword === "" && formData.prevpassword === "" && formData.bio === "" && formData.profilepicture === null) {
      setErr("Fill at least 1 field or both fields on password if you want to change password");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${currentUser.token}`,
        // "Content-Type": "multipart/form-data",
      };
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      const response = await api.post(`/users/edit`, formDataToSend, { headers });
      if (response.status === 200) {
        // Handle success
        window.location.reload();
      } else {
        setErr(response.data.message); // Assuming error message is provided in response
      }
    } catch (err) {
      setErr(err.response.data.message); // Assuming error message is provided in response
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <h2>Edit Profile and Password</h2>
        <form onSubmit={handleSubmit}>
          {profilePicture && <img src={profilePicture} alt="Profile" />} {/* Display the profile picture if available */}
          <input type="file" id="file" className="file-input" name="profilepicture" onChange={handleFileChange} />
          <label htmlFor="file" className="file-label">
            <AccountCircleIcon />
            <div className="item file-container">
              <span>Edit Your Profile Picture</span>
            </div>
          </label>
          <input autoComplete="off" type="text" placeholder="Change Username" onChange={handleChange} name="username" value={formData.username} />
          <input autoComplete="off" type="text" placeholder="Change Email" onChange={handleChange} name="email" value={formData.email} />
          <input autoComplete="off" type="text" placeholder="Edit Bio" onChange={handleChange} name="bio" value={formData.bio} />
          <p>Change Password</p>
          <input autoComplete="off" type="password" placeholder="Previous Password" onChange={handleChange} name="prevpassword" value={formData.prevpassword} />
          <input autoComplete="off" type="password" placeholder="New Password" onChange={handleChange} name="newpassword" value={formData.newpassword} />
          {err && <p>{err}</p>} {/* Display error message */}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
