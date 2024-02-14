/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../styles/login.css";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetUser } from "../store/userReducer";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e, setFunc) => {
    setFunc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName === "" || password === "") {
      return;
    } else {
      loginUser();
    }
  };

  const loginUser = async () => {
    try {
      const body = { user_name: userName, password: password };

      const login = await axios.post(`${BASE_URL}/login`, body);

      dispatch(SetUser({ user: login.data.details }));

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e, setPassword)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="redirect-line">
          New user? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
