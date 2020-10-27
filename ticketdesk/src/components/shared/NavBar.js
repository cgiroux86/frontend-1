import React from "react";
import { Link } from "react-router-dom";
import Q from "../../images/Q.png";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state) => state.User);
  const history = useHistory();

  return (
    <div className="navbar">
      <div className="ticket_queue">
        <img src={Q} alt="Ticket Queue logo"></img>
        <p>TICKET QUEUE</p>
      </div>
      <div className="nav_links">
        <Link className="link" to="/login">
          <p>{user.is_logged ? "Logout" : "Login"}</p>
        </Link>
        {!user.is_logged && (
          <Link to="/register">
            <p>{!user.is_logged && "Register"}</p>
          </Link>
        )}
        {user.admin &&
          (!user.is_admin_view ? (
            <Link to="/admin">
              <p>{user.admin && "Admin"}</p>
            </Link>
          ) : (
            <Link to="/dashboard">
              <p>{user.admin && "Dashboard"}</p>
            </Link>
          ))}

        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
    </div>
  );
}
