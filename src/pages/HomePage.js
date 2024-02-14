import React, { useState } from "react";
import "../styles/homepage.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { Logout } from "../store/userReducer";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [image, setImage] = useState(null);

  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user_id, first_name } = userData;

  const handleLogout = () => {
    logout();
  };

  const logout = async () => {
    await axios.post(`${BASE_URL}/logout`, { user_id: user_id });
    dispatch(Logout());
    navigate("/login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image === null) {
      return;
    } else {
      uploadImage();
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const result = await axios.post(`${BASE_URL}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data", user_id: user_id },
      });

      console.log("result: ", result);

      alert("Image uploaded successfully");
      setImage(null);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="home-page">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="content">
        <div className="rectangular-box">
          <h2>Welcome, {first_name}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        {image && (
          <div className="image-preview">
            <h3>Uploaded Image:</h3>
            <img src={URL.createObjectURL(image)} alt="Uploaded" />
          </div>
        )}
      </div>
    </div>
  );
}
