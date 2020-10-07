<<<<<<< HEAD:src/components/navbar/index.js
import React from 'react';
import { Link } from 'react-router-dom';
=======
import React from "react";
import Link from "next/link";
import styles from "../styles/navbar.scss";
import Q from "../images/Q.png";
>>>>>>> 930b5d4c850d48a3fbe6af5b1a81f0a3043d72ce:page_components/navbar.js

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.ticket_queue}>
        <img src={Q}></img>
        <p>TICKET QUEUE</p>
      </div>
<<<<<<< HEAD:src/components/navbar/index.js
      <div className="nav_links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/home">Home</Link>
=======
      <div className="logo"></div>
      <div className={styles.nav_links}>
        <Link className={styles.link} href="/login">
          <a>Login</a>
        </Link>
        <Link href="/register">
          <a>Register</a>
        </Link>
        <Link href="/home">
          <a>Home</a>
        </Link>
>>>>>>> 930b5d4c850d48a3fbe6af5b1a81f0a3043d72ce:page_components/navbar.js
      </div>
    </div>
  );
}
