import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./HRLogin.css";

function HRLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    API.post("/auth/login/", {
      username: email,
      password: password,
    })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        navigate("/admin");
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>HR Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <input
          type="text"
          placeholder="Email / Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default HRLogin;
