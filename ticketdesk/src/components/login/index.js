import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import axios from "axios";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

const Login = ({ history }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      .catch((err) => {
        console.log(err);
      });
  };

  const responseGoogle = (response) => {
    const user = {
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    };
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
  };

  const responseFacebook = (response) => {
    const user = {
      email: response.email,
      password: response.id,
    };
    axios.post("/auth/login", user).then((res) => {
      localStorage.setItem("token", res.data.token);
      history.push("/dashboard");
    });
  };

  return (
    <div>
      <NavBar />

      <div className="login">
        <div className="welcome_back">
          <p>Welcome Back!</p>
        </div>
        <div className="social_login">
          <div>
            <FacebookLogin
              cssClass="facebook_login"
              appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
              fields="name,email,picture"
              callback={responseFacebook}
              icon={<FontAwesomeIcon icon={faFacebook} />}
              textButton="Sign in with Facebook"
            />
          </div>
          <div className="google">
            <GoogleLogin
              className="google_login"
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
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
