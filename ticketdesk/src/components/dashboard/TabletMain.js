import React from "react";
import Expansion from "./Expansion";
import { useSelector } from "react-redux";
import Card from "./Card";

export default function TabletMain({ active, setActive, choose }) {
  const tickets = useSelector((state) => state.Tickets.tickets);
  console.log("THIS IS ACTIVE", active);
  return (
    <div className="tablet_container">
      <div className="tablet_left">
        <div className="tablet_expansion_container">
          <Expansion />
        </div>
      </div>
      <div className="tablet_right">
        <div className="tablet_header">
          <h1>The Queue</h1>
          <div className="tablet_options">
            <div
              id="all"
              onClick={choose}
              className={active.all ? "active" : "inactive"}
            >
              All Tickets
            </div>
            <div
              id="my"
              onClick={choose}
              className={active.my ? "active" : "inactive"}
            >
              My Tickets
            </div>
          </div>
        </div>
        <div className="tablet_ticket_container">
          {tickets &&
            tickets.length > 0 &&
            tickets.map((item) => {
              return (
                <Card
                  // fetchData={fetchData}
                  id={item.ticket_id}
                  key={Math.floor(Math.random() * 10000)}
                  info={item}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
