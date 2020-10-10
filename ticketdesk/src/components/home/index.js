import React from "react";
import Navbar from "../shared/NavBar";
import screen from "../../images/screen.png";
import { motion } from "framer-motion";

export default function Home({ history }) {
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
            <button onClick={() => history.push("/register")}>
              Get Started
            </button>
          </div>
        </div>
        <motion.div
          className="landing_item"
          animate={{ x: -150 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <img src={screen} alt="iphone with ticket queue tickets displayed" />
        </motion.div>
      </div>
    </div>
  );
}
