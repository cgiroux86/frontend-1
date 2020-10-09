import React, { useState } from "react";
import styles from "../../styles/login.scss";
import NavBar from "../shared/NavBar";
import axios from "axios";

const Login = ({ history }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  console.log(credentials, "credentials");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log("URL => ", `${axios.defaults.baseURL}/auth/login`);
    e.preventDefault();
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="welcome_back">
        <p>Welcome Back!</p>
      </div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
