import React from "react";
import { Link } from "react-router-dom";
import Q from "../../images/Q.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="ticket_queue">
        <img src={Q} alt="Ticket Queue logo"></img>
        <p>TICKET QUEUE</p>
      </div>
      <div className="logo"></div>
      <div className="nav_links">
        <Link className="link" to="/login">
          <p>Login</p>
        </Link>
        <Link to="/register">
          <p>Register</p>
        </Link>
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
    </div>
  );
}
