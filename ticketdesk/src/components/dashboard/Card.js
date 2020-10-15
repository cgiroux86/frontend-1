import React from "react";
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
      .then((res) => fetchData())
      .catch((err) => console.log(err));
  };

  const setCardAsMain = () => {
    setTicket({ ...ticket, selected: info, responses: [] });
  };

  const [ticket, setTicket] = useRecoilState(ticketState);
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
