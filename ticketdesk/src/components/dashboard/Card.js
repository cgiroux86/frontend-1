import React, { useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { getPriority } from "../../utils/functions";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import { useRecoilState } from "recoil";
import { ticketState } from "../../recoil/ticketState";
import { formatDate } from "../../utils/formatDate";

export default function Card({ info, fetchData }) {
  const deleteCard = (id) => {
    AxiosWithAuth()
      .delete(`/tickets/${id}`)
      .then((res) => {
        console.log("THIS IS ALL", res.data);
        setTicket({
          ...ticket,
          tickets: res.data,
          selected: res.data[0] || {},
        });
      })
      .catch((err) => console.log(err));
  };

  const [ticket, setTicket] = useRecoilState(ticketState);
  const setCardAsMain = () => {
    setTicket({ ...ticket, selected: info });
    console.log("INFO IN CARD", info, ticket);
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
