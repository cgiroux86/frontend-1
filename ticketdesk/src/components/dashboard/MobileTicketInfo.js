import React from "react";
import { useSelector } from "react-redux";
import DropDown from "./Dropdown";

export default function MobileTicketInfo({ ticket }) {
  const user = useSelector((state) => state.User);
  return (
    <div>
      <h1>Ticket Info</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3>Description:</h3>
        <span>{` ${ticket.description}`}</span>
      </div>
      <p>
        <strong>Attempted Solutions: </strong>
        {ticket.attempted_solutions}
      </p>
      <p>
        <strong>More Info: </strong>
        {ticket.more_info}
      </p>
      <p>
        <strong>Priority: </strong>
        {!user.admin ? (
          ticket.priority ? (
            `${ticket.priority}`
          ) : (
            "Not yet assigned"
          )
        ) : (
          <DropDown name="priority" />
        )}
      </p>
      <p>
        <strong>Assigned: </strong>
        {!user.admin ? (
          ticket.assgined_first ? (
            `${ticket.assigned_first} ${ticket.assigned_last}`
          ) : (
            "Not yet assigned"
          )
        ) : (
          <DropDown name="Assigned" />
        )}
      </p>
      <p>
        <strong>Department: </strong>{" "}
        {!user.admin ? (
          ticket.department ? (
            ticket.department
          ) : (
            "No derpatment assigned"
          )
        ) : (
          <DropDown name="department" />
        )}
      </p>
    </div>
  );
}
