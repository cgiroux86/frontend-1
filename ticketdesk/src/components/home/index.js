import React from "react";
import Navbar from "../shared/NavBar";
import screen from "../../images/screen.png";
import styles from "../../styles/landing.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="landing_page">
        <div className="landing_title">
          <h1>Ticket Queue</h1>
          <div className="title_text">
            <p>Making it easier...</p>
            <p style={{ fontSize: "1.5rem" }}>to get the help you need.</p>
            <p style={{ fontSize: "1.2em" }}>
              Submit help tickets and view open tickets all in one place.
            </p>
            <button>
              <Link to="/register">Get Started</Link>
            </button>
          </div>
        </div>
        <motion.div
          className="landing_item"
          animate={{ x: -150 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <img src={screen} />
        </motion.div>
      </div>
    </div>
  );
}
