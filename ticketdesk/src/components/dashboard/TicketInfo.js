import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import { useRecoilState } from "recoil";
import { ticketState } from "../../recoil/ticketState";

export default function TicketInfo() {
  const [ticket, setTicket] = useRecoilState(ticketState);
  const [department, setDepartment] = useState(false);
  const [priority, setPriority] = useState(false);
  const [response, setResponse] = useState("");

  const toggleAssignDepartment = () => {
    setDepartment(!department);
    setPriority(false);
  };
  const toggleAssignPriority = () => {
    setPriority(!priority);
    setDepartment(false);
  };
  const handleResponse = (e) => {
    setResponse(e.target.value);
    console.log(response);
  };

  const fetchResponses = (id) => {
    AxiosWithAuth()
      .get(`/tickets/responses/${id}`)
      .then((res) => setTicket({ ...ticket, responses: res.data }))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    ticket.selected && fetchResponses(ticket.selected.ticket_id);
  }, [ticket.selected]);

  const submitResponse = (e) => {
    e.preventDefault();
    AxiosWithAuth()
      .post(`/tickets/${ticket.selected.ticket_id}/responses`, {
        message: response,
        ticket_id: ticket.selected.ticket_id,
      })
      .then((res) => {
        console.log(res);
        fetchResponses(ticket.selected.ticket_id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dashboard_right">
      <div className="ticket_info_wrapper">
        <div className="ticket_title">
          <h2>Ticket Title: {ticket.selected.description}</h2>
        </div>
        <div className="ticket_age">
          <h6>Age of Ticket: {`${ticket.selected.created_at} days old`}</h6>
        </div>
        <div>
          <p>Attempted Solutions: {ticket.selected.attempted_solutions}</p>
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
          <p>
            <strong>Assigned: </strong>
            {ticket.assigned_first
              ? `${ticket.selected.assigned_first} ${ticket.selected.assigned_last}`
              : "Not yet assigned"}
          </p>
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
          <textarea
            onChange={handleResponse}
            className="ticket_text"
          ></textarea>
        </div>
        <div>
          <button onClick={submitResponse}>Submit Response</button>
        </div>
      </div>
      <div>
        <h3>Responses</h3>
        {ticket.responses.length > 0 &&
          ticket.responses.map((res, idx) => {
            return <div key={idx}>{res.message}</div>;
          })}
      </div>
    </div>
  );
}
