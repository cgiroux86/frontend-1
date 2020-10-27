import React from "react";
import { Avatar } from "@material-ui/core";
import { getCardTicketStatus, getPriority } from "../../utils/functions";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import { formatDate } from "../../utils/formatDate";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllTickets,
  setSelectedTicket,
} from "../../redux/actions/ticketActions";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ConfirmPopover from "./Popover";

export default function Card({ info }) {
  const deleteCard = (id) => {
    console.log("ID TO DELETE", id);
    AxiosWithAuth()
      .delete(`/tickets/${id}`)
      .then((res) => {
        dispatch(fetchAllTickets(res.data));
        dispatch(setSelectedTicket(res.data[0] || {}));
      })
      .catch((err) => console.log(err));
  };

  const markCardComplete = (id) => {
    const updates = {
      status: "not started",
    };
    AxiosWithAuth()
      .put(`/tickets/${id}/update`, updates)
      .then((res) => {
        console.log(res.data.tickets);
        dispatch(fetchAllTickets(res.data.tickets));
      })
      .catch((err) => console.log(err));
  };

  const ticket = useSelector((state) => state.Tickets);
  const dispatch = useDispatch();
  const setCardAsMain = () => {
    ticket.selected.ticket_id !== info.ticket_id &&
      dispatch(setSelectedTicket(info));
  };
  return (
    <div onClick={setCardAsMain} className="card">
      <div className={getPriority(info.priority)}></div>
      <div className="age_text">
        <p>
          {formatDate(info.created_at)}
          <br />
          days
          <br />
          old
        </p>
      </div>
      <div className="card_middle">
        <h2>{info.description}</h2>
      </div>
      <div className="card_right">
        {info.assigned_first && info.assigned_last && (
          <div>
            <Avatar
              style={{ color: "white", fontWeight: "bold" }}
              src={info.image}
            >
              {info.assigned_first &&
                info.assigned_last &&
                `${info.assigned_first[0]}${info.assigned_last[0]}`}
            </Avatar>
          </div>
        )}
      </div>
      <div className="complete_delete_container">
        <div className="popover_container">
          <ConfirmPopover
            text="Are you sure you want to make this complete?"
            icon={faCheck}
            iconClass="complete"
            fn={markCardComplete}
            ticket_id={info.ticket_id}
          />
          <ConfirmPopover
            icon={faTimes}
            iconClass="delete"
            text="Are you sure you wish to delete this card?"
            fn={deleteCard}
            ticket_id={info.ticket_id}
          ></ConfirmPopover>
        </div>
        <div className="card_ticket_status">
          Status:{" "}
          <div
            style={{
              background: getCardTicketStatus(info),
              height: "10px",
              width: "10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
