import React from "react";
import { Link } from "react-router-dom";
import Q from "../../images/Q.png";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.User);
  return (
    <div className="navbar">
      <div className="ticket_queue">
        <img src={Q} alt="Ticket Queue logo"></img>
        <p>TICKET QUEUE</p>
      </div>
      <div className="logo"></div>
      <div className="nav_links">
        <Link className="link" to="/login">
          <p>{user.is_logged ? "Logout" : "Login"}</p>
        </Link>
        {!user.is_logged && (
          <Link to="/register">
            <p>{!user.is_logged && "Register"}</p>
          </Link>
        )}
        {user.admin && (
          <Link to="/admin">
            <p>{user.admin && "Admin"}</p>
          </Link>
        )}

        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
    </div>
  );
}
