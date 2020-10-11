import React, { useState } from "react";

export default function TicketInfo({ ticket }) {
  const [department, setDepartment] = useState(false);
  const [priority, setPriority] = useState(false);
  const toggleAssignDepartment = () => {
    setDepartment(!department);
    setPriority(false);
  };
  const toggleAssignPriority = () => {
    setPriority(!priority);
    setDepartment(false);
  };
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
          <div className="department_container">
            <div className="assign_department">
              <p>
                <strong>Priority: </strong>
                {ticket.priority || " No priority assigned"}
              </p>
              <button onClick={toggleAssignPriority}>Assign Priority</button>
            </div>
            <div
              className={
                priority ? "show_department_dropdown" : "department_dropdown"
              }
            ></div>
          </div>
        </div>
        <div>
          <p>{ticket.assigned_to}</p>
          <div className="department_container">
            <div className="assign_department">
              <p>
                <strong>Department:</strong>
                {ticket.department || " No department assigned"}
              </p>
              <button onClick={toggleAssignDepartment}>
                Assign Department
              </button>
            </div>
            <div
              className={
                department ? "show_department_dropdown" : "department_dropdown"
              }
            ></div>
          </div>
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
