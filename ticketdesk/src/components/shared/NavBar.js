import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/navbar.scss";
import Q from "../../images/Q.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="ticket_queue">
        <img src={Q}></img>
        <p>TICKET QUEUE</p>
      </div>
      <div className="logo"></div>
      <div className="nav_links">
        <Link className="link" to="/login">
          <a>Login</a>
        </Link>
        <Link to="/register">
          <a>Register</a>
        </Link>
        <Link to="/">
          <a>Home</a>
        </Link>
      </div>
    </div>
  );
}
