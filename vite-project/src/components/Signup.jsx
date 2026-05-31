import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const { username, email, mobile, password } = formData;

    if (!username || !email || !mobile || !password) {
      return alert("All fields are required");
    }

    setLoading(true);

    axios
      .post("http://localhost:8080/user", {
        username,
        email,
        mobile,
        password,
      })

      .then((res) => {
        alert(res.data.message);

        setFormData({
          username: "",
          email: "",
          mobile: "",
          password: "",
        });

        navigate("/login");
      })

      .catch((error) => {
        alert(error.response?.data?.message || "Something went wrong");
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="signup-container">

      <div className="signup-overlay">

        <form onSubmit={submit} className="signup-form">

          <h2>Create Account</h2>
          <p>Welcome Back</p>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="number"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>

          <p className="login-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Signup;