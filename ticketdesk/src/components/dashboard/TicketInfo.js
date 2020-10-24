import React, { useState } from "react";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import Alert from "./Alert";
import { formatDate } from "../../utils/formatDate";
import Responses from "./Responses";
import DropDown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllTickets,
  setSelectedTicket,
  updateTicketResponses,
} from "../../redux/actions/ticketActions";
import { shouldDisplayInfo } from "../../utils/functions";

export default function TicketInfo() {
  const [department, setDepartment] = useState(false);
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(false);
  const [dropDownState, setDropDownState] = useState({
    priority: ["Low", "Medium", "High"],
    assigned: [],
    department: ["Human Resources", "Accounting", "IT", "Marketing"],
  });
  const ticket = useSelector((state) => state.Tickets);
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();

  const toggleAssignDepartment = () => {
    setDepartment(!department);
  };
  const handleResponse = (e) => {
    setResponse(e.target.value);
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
        dispatch(fetchAllTickets(res.data.tickets));
        dispatch(setSelectedTicket(res.data.updated));
      })
      .catch((err) => console.log(err));
  };

  const submitResponse = (e) => {
    e.preventDefault();
    AxiosWithAuth()
      .post(`/tickets/${ticket.selected.ticket_id}/responses`, {
        message: response,
        ticket_id: ticket.selected.ticket_id,
      })
      .then((res) => {
        dispatch(
          updateTicketResponses({
            data: res.data.tickets,
            responses: res.data.updated.responses,
          })
        );

        setSuccess(true);
        setResponse("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dashboard_right">
      <div className="ticket_info_wrapper">
        <div className="ticket_title">
          <h2>
            Ticket Title: {ticket.selected && ticket.selected.description}
          </h2>
        </div>
        <div className="ticket_age">
          <strong>Age of Ticket: </strong>
          <p>
            {ticket.selected &&
              ` ${formatDate(ticket.selected.created_at)} days old`}
          </p>
        </div>
        <div className="department_container">
          <div className="assign_department">
            <p>
              <strong>Attempted solutions: </strong>
              {(ticket.selected && ticket.selected.attempted_solutions) ||
                " No priority assigned"}
            </p>
          </div>
        </div>
        <div className="department_container">
          <div className="assign_department">
            <p>
              <strong>More info: </strong>
              {(ticket.selected && ticket.selected.more_info) || " N/A"}
            </p>
          </div>
        </div>
        <div>
          <div className="department_container">
            {shouldDisplayInfo(user.id, ticket.selected) ? (
              <div className="assign_department">
                <p>
                  <strong>Priority: </strong>
                </p>
                <DropDown name="priority" />
              </div>
            ) : (
              <div className="assign_department">
                {" "}
                {ticket.selected.priority || " No priority assigned"}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="department_container">
            {shouldDisplayInfo(user.id, ticket.selected) ? (
              <div className="assign_department">
                <p>
                  <strong>Assigned: </strong>
                </p>
                <DropDown name="Assigned" />
              </div>
            ) : (
              <div className="assign_department">
                <p>
                  <strong>Assigned: </strong>
                </p>
                <p>{ticket.selected.assigned_to || "Not yet assigned"}</p>
              </div>
            )}
          </div>
          <div className="department_container">
            <div className="assign_department">
              <p>
                <strong>Department:</strong>
                {(ticket.selected && ticket.selected.department) ||
                  " No department assigned"}
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
      <div style={{ height: "100%" }}>
        {shouldDisplayInfo(user.id, ticket.selected) && <Responses />}
      </div>
    </div>
  );
}
