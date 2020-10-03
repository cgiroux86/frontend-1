import React from "react";
import Link from "next/link";
import styles from "../styles/navbar.scss";
import Q from "../images/Q.png";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.ticket_queue}>
        <img src={Q}></img>
        <p>TICKET QUEUE</p>
      </div>
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
      </div>
    </div>
  );
}
