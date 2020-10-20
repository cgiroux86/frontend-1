import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import { useRecoilState } from "recoil";
import { ticketState } from "../../recoil/ticketState";
import Alert from "./Alert";
import { formatDate } from "../../utils/formatDate";
import Responses from "./Responses";
import DropDown from "./Dropdown";

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

  const fetchAllTickets = () => {
    AxiosWithAuth()
      .get("/tickets")
      .then((res) => setTicket({ ...ticket, tickets: res.data }))
      .catch((err) => console.log(err));
  };

  const submitTicketUpdates = () => {
    const updates = {
      priority: ticket.selected.priority
        ? ticket.selected.priority.toUpperCase()
        : null,
      assigned_to: ticket.selected.assigned_to,
    };
    AxiosWithAuth()
      .put(`/tickets/${ticket.selected.ticket_id}/update`, updates)
      .then((res) => {
        setTicket({
          ...ticket,
          tickets: res.data.tickets,
          selected: res.data.updated.ticket,
        });
      })
      .catch((err) => console.log(err));
  };

  const hanldePriorityChange = (priority) => {
    setTicket({ ...ticket, selected: { ...ticket.selected, priority } });
  };

  const assignMemberRole = (member) => {
    console.log("MEMBER", member);
    setTicket({
      ...ticket,
      selected: {
        ...ticket.selected,
        assigned_to: member.id,
        assigned_first: member.first_name,
        assigned_last: member.last_name,
      },
    });
  };

  useEffect(() => {
    AxiosWithAuth()
      .get("/users")
      .then((res) => {
        console.log(res);
        setTicket({ ...ticket, assigned: res.data });
      });
  }, []);

  useEffect(() => {
    fetchResponses(ticket.selected.ticket_id);
  }, [ticket.selected]);

  const submitResponse = (e) => {
    e.preventDefault();
    AxiosWithAuth()
      /////////
      .post(`/tickets/${ticket.selected.ticket_id}/responses`, {
        message: response,
        ticket_id: ticket.selected.ticket_id,
      })
      .then((res) => {
        fetchResponses(ticket.selected.ticket_id);
        setSuccess(true);
        setResponse("");
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
          <strong>Age of Ticket: </strong>
          <p>{` ${formatDate(ticket.selected.created_at)} days old`}</p>
        </div>
        <div className="department_container">
          <div className="assign_department">
            <p>
              <strong>Attempted solutions: </strong>
              {ticket.selected.attempted_solutions || " No priority assigned"}
            </p>
          </div>
        </div>
        <div className="department_container">
          <div className="assign_department">
            <p>
              <strong>More info: </strong>
              {ticket.selected.more_info || " N/A"}
            </p>
          </div>
        </div>
        <div>
          <DropDown name="priority" />
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
              {ticket.priority.length > 0 &&
                ticket.priority.map((p) => {
                  return (
                    <div
                      onClick={() => hanldePriorityChange(p)}
                      key={Math.random() * 10000}
                    >
                      {p}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div>
          <DropDown name="Assigned" />
          <div className="department_container">
            <div className="assign_department">
              <p>
                <strong>Assigned: </strong>
                {ticket.selected.assigned_first
                  ? `${ticket.selected.assigned_first} ${ticket.selected.assigned_last}`
                  : " Not yet assigned"}
              </p>
              <button onClick={toggleAssignRole}>Assign Now</button>
            </div>
            <div
              className={
                assigned ? "show_department_dropdown" : "department_dropdown"
              }
            >
              {ticket.assigned.length > 0 &&
                ticket.assigned.map((member) => {
                  return (
                    <div
                      onClick={() => assignMemberRole(member)}
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
        <button onClick={submitTicketUpdates}>Submit Changes</button>
      </div>
      <div className="response_container">
        <div className="ticket_response_wrapper">
          <h2>Reply Here</h2>
          <textarea
            onChange={handleResponse}
            className="ticket_text"
            value={response}
          ></textarea>
        </div>
        <div>
          <button onClick={submitResponse}>Submit Response</button>
        </div>
      </div>
      <Responses />
    </div>
  );
}
