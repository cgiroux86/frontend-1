import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">

      </div>
      <div className="nav_links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/home">Home</Link>
      </div>
    </div>
  )
}