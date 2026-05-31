import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      return alert("Fill all fields");
    }

    try {
      const res = await axios.post("https://boots-backend.onrender.com/post/login", data);
      alert(res.data.message);

      if (res.data.success) {
        navigate("/home");
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={submit}>

        <h2>Login 👟</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        <p className="signup-text">
          Don't have an account?{" "}
          <button 
            type="button" 
            onClick={() => navigate("/signup")} 
            className="signup-link-btn"
            style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
          >
            Sign Up
          </button>
        </p>

      </form>
    </div>
  );
}

export default Login;