import React, { useState } from "react";
import styles from "../../styles/register.scss";
import NavBar from "../shared/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", credentials)
      .then((res) => {
        console.log("response", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <NavBar />
      <div className="page_slogan">
        <p>You're just a few steps away from the help you need...</p>
      </div>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="last_name"
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <FontAwesomeIcon
            onClick={viewPassword}
            className={styles.eye}
            icon={faEye}
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
