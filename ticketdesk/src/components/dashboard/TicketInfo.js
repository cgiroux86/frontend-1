import React, { useState } from "react";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import Alert from "./Alert";
import { formatDate } from "../../utils/formatDate";
import Responses from "./Responses";
import DropDown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllTickets,
  resetTicketViewed,
  setSelectedTicket,
  updateTicketResponses,
} from "../../redux/actions/ticketActions";
import { shouldDisplayInfo } from "../../utils/functions";

export default function TicketInfo() {
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(false);
  const ticket = useSelector((state) => state.Tickets);
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();

  const handleResponse = (e) => {
    setResponse(e.target.value);
  };

  const submitTicketUpdates = () => {
    const updates = {
      priority: ticket.selected.priority
        ? ticket.selected.priority.toUpperCase()
        : null,
      assigned_to: ticket.selected.assigned_to,
      department: ticket.selected.dept_id
        ? ticket.selected.dept_id.toUpperCase()
        : null,
    };
    AxiosWithAuth()
      .put(`/tickets/${ticket.selected.ticket_id}/update`, updates)
      .then((res) => {
        dispatch(fetchAllTickets(res.data.tickets));
        dispatch(setSelectedTicket(res.data.updated));
        dispatch(resetTicketViewed(false));
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
        <div className="choices_container">
          {/* <div>
            <div className="department_container">
              {user.admin ? (
                <div className="assign_department">
                  <p>
                    <strong>Status: </strong>
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
          </div> */}
          <div>
            <div className="department_container">
              {user.admin ? (
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
              {user.admin ? (
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
              {user.admin ? (
                <div className="assign_department">
                  <p>
                    <strong>Department: </strong>
                  </p>
                  <DropDown name="Department" />
                </div>
              ) : (
                <div className="assign_department">
                  <p>
                    <strong>Department: </strong>
                  </p>
                  <p>{ticket.selected.assigned_to || "Not yet assigned"}</p>
                </div>
              )}
            </div>
            <div className={success ? "alert" : "dont_show"}>
              <Alert setSuccess={setSuccess} />
            </div>
          </div>
          {user.admin && ticket.selected.has_been_updated && (
            <button onClick={submitTicketUpdates}>Submit Changes</button>
          )}
        </div>
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
          <button onClick={submitResponse}>Submit</button>
        </div>
      </div>
      <div style={{ height: "100%" }}>
        {shouldDisplayInfo(user.id, ticket.selected) && <Responses />}
      </div>
    </div>
  );
}
