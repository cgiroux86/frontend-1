import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
const Register = ({ history }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

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
      .then(() => {
        axios
          .post("/auth/login", credentials)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            const userData = {
              id: res.data.id,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              email: res.data.email,
              admin: res.data.admin,
            };
            dispatch(loginUser(userData));
            history.push("/dashboard");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const responseGoogle = (response) => {
    const user = {
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    };
    axios
      .post("/auth/register", user)
      .then((res) => {
        axios.post("/auth/login", user).then((res) => {
          console.log("RES", res);
          const userData = {
            id: res.data.id,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
            admin: res.data.admin,
          };
          dispatch(loginUser(userData));
          localStorage.setItem("token", res.data.token);
          history.push("/dashboard");
        });
      })
      .catch((err) => console.log(err));
  };

  const responseFacebook = (response) => {
    let split = response.name.split(" ");
    const user = {
      first_name: split[0],
      last_name: split[1],
      email: response.email,
      password: response.id,
    };
    axios
      .post("/auth/register", user)
      .then(() => {
        axios
          .post("/auth/login", user)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            const userData = {
              id: res.data.id,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              email: res.data.email,
              admin: res.data.admin,
            };
            dispatch(loginUser(userData));
            history.push("/dashboard");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="register">
      <NavBar />
      <div className="register_card_container">
        <div className="page_slogan">
          <p>You're just a few steps away from the help you need...</p>
        </div>
        <div className="form_container">
          <div className="socials">
            <div className="facebook">
              <FacebookLogin
                cssClass="facebook"
                style={{ background: "red", width: "100%" }}
                appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                fields="name,email,picture"
                callback={responseFacebook}
                icon={<FontAwesomeIcon icon={faFacebook} />}
                textButton="Sign up with Facebook"
              />
            </div>
            <div className="google">
              <GoogleLogin
                className="google"
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign Up With Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
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
            ></input>
            <FontAwesomeIcon
              onClick={viewPassword}
              className="eye"
              icon={faEye}
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
