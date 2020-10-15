import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import { useRecoilState } from "recoil";
import { ticketState } from "../../recoil/ticketState";
import Alert from "./Alert";

export default function TicketInfo() {
  const [ticket, setTicket] = useRecoilState(ticketState);
  const [department, setDepartment] = useState(false);
  const [priority, setPriority] = useState(false);
  const [response, setResponse] = useState("");
  const [assigned, setAssigned] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropDownState, setDropDownState] = useState({
    priority: ["Low", "Medium", "High"],
    assigned: [],
    department: ["Human Resources", "Accounting", "IT", "Marketing"],
  });

  const toggleAssignDepartment = () => {
    setDepartment(!department);
  };
  const toggleAssignPriority = () => {
    setPriority(!priority);
  };
  const handleResponse = (e) => {
    setResponse(e.target.value);
  };

  const toggleAssignRole = () => {
    setAssigned(!assigned);
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

  useEffect(() => {
    AxiosWithAuth()
      .get("/users")
      .then((res) => {
        setDropDownState({ ...dropDownState, assigned: res.data });
      });
  }, []);

  const submitResponse = (e) => {
    e.preventDefault();
    AxiosWithAuth()
      .post(`/tickets/${ticket.selected.ticket_id}/responses`, {
        message: response,
        ticket_id: ticket.selected.ticket_id,
      })
      .then((res) => {
        fetchResponses(ticket.selected.ticket_id);
        setSuccess(true);
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
                {ticket.selected.priority || " No priority assigned"}
              </p>
              <button onClick={toggleAssignPriority}>Assign Priority</button>
            </div>
            <div
              className={
                priority ? "show_department_dropdown" : "department_dropdown"
              }
            >
              {dropDownState.priority.length > 0 &&
                dropDownState.priority.map((p) => {
                  return <div key={Math.random() * 10000}>{p}</div>;
                })}
            </div>
          </div>
        </div>
        <div>
          <div className="department_container">
            <div className="assign_department">
              <p>
                <strong>Assigned: </strong>
                {ticket.selected.priority || " No priority assigned"}
              </p>
              <button onClick={toggleAssignRole}>Assign Priority</button>
            </div>
            <div
              className={
                assigned ? "show_department_dropdown" : "department_dropdown"
              }
            >
              {dropDownState.assigned.length > 0 &&
                dropDownState.assigned.map((member) => {
                  return (
                    <div
                      key={Math.random() * 10000}
                    >{`${member.first_name} ${member.last_name}`}</div>
                  );
                })}
            </div>
          </div>
          <div className="department_container">
            <div className="assign_department">
              <p>
                <strong>Department:</strong>
                {ticket.selected.department || " No department assigned"}
              </p>
              <button onClick={toggleAssignDepartment}>
                Assign Department
              </button>
            </div>
            <div
              className={
                department ? "show_department_dropdown" : "department_dropdown"
              }
            >
              {dropDownState.department.length > 0 &&
                dropDownState.department.map((dept) => {
                  return <div key={Math.random() * 10000}>{dept}</div>;
                })}
            </div>
          </div>
          <div className={success ? "alert" : "dont_show"}>
            <Alert setSuccess={setSuccess} />
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
