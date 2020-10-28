import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function MobileMain({
  setSuccess,
  fetchData,
  active,
  setActive,
}) {
  const choose = (e) => {
    if (e.target.id === "all") {
      setActive({
        all: true,
        my: false,
      });
    } else if (e.target.id === "my") {
      setActive({
        all: false,
        my: true,
      });
    }
  };
  return (
    <div>
      <div className="mobile_header">
        <div className="mobile_title">
          <h2>The Queue</h2>
        </div>
        <div className="mobile_options_container">
          <div
            id="all"
            onClick={choose}
            className={active.all ? "active" : "main_button"}
          >
            All Tickets
          </div>
          <div
            id="my"
            onClick={choose}
            className={active.my ? "active" : "main_button"}
          >
            My Tickets
          </div>
        </div>
      </div>
    </div>
  );
}
