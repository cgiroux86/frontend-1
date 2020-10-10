import React from "react";

export default function TicketInfo({ ticket }) {
  return (
    <div className="dashboard_right">
      <div className="ticket_info_wrapper">
        <div className="ticket_title">
          <h2>Ticket Title: {ticket.title}</h2>
        </div>
        <div className="ticket_age">
          <h6>Age of Ticket: {`${ticket.age} days old`}</h6>
        </div>
        <div>
          <p>Attempted Solutions: {ticket.attempted_solutions}</p>
        </div>
        <div>
          <p>Priority: {ticket.priority || "Not yet assigned"}</p>
        </div>
        <div>
          <p>{ticket.assigned_to}</p>
          <p>Department: {ticket.department || "No department assigned"}</p>
        </div>
      </div>
      <div className="response_container">
        <div className="ticket_response_wrapper">
          <h2>Reply Here</h2>
          <textarea className="ticket_text"></textarea>
        </div>
        <div>
          <button>Submit Response</button>
        </div>
      </div>
    </div>
  );
}
