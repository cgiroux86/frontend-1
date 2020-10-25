import React from "react";
import { Avatar } from "@material-ui/core";
import { getPriority } from "../../utils/functions";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import { formatDate } from "../../utils/formatDate";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllTickets,
  setSelectedTicket,
} from "../../redux/actions/ticketActions";

export default function Card({ info, fetchData }) {
  const deleteCard = (id) => {
    AxiosWithAuth()
      .delete(`/tickets/${id}`)
      .then((res) => {
        dispatch(fetchAllTickets(res.data));
        dispatch(setSelectedTicket(res.data[0] || {}));
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
      <button onClick={() => deleteCard(info.ticket_id)}>Delete</button>
    </div>
  );
}
