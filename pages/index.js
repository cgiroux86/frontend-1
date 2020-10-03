import React from "react";
import Navbar from "../page_components/navbar";
import screen from "../images/screen.png";
import styles from "../styles/landing.scss";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className={styles.landing_page}>
        <div className={styles.landing_title}>
          <h1>Ticket Queue</h1>
          <div className={styles.title_text}>
            <p>Making it easier...</p>
            <p style={{ fontSize: "1.5rem" }}>to get the help you need.</p>
            <p style={{ fontSize: "1.2em" }}>
              Submit help tickets and view open tickets all in one place.
            </p>
            <button>Get Started</button>
          </div>
        </div>
        <div className={styles.landing_item}>
          <img src={screen} />
        </div>
      </div>
    </div>
  );
}
