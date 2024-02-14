import { useState } from "react";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e, setFunc) => {
    setFunc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userName === "" ||
      firstName === "" ||
      lastName === "" ||
      emailId === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return;
    } else if (confirmPassword === password) {
      const body = {
        user_name: userName,
        first_name: firstName,
        last_name: lastName,
        email_id: emailId,
        password: password,
      };

      registerUser(body);

      navigate("/login");
    } else {
      return;
    }
  };

  // api call
  const registerUser = async (body) => {
    try {
      const newUser = await axios.post(`${BASE_URL}/register`, body);

      console.log(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="rectangular-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={userName}
              onChange={(e) => handleChange(e, setUserName)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => handleChange(e, setFirstName)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => handleChange(e, setLastName)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={emailId}
              onChange={(e) => handleChange(e, setEmailId)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e, setPassword)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleChange(e, setConfirmPassword)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Sign Up</button>
          </div>
        </form>

        <div className="redirect-line">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}
