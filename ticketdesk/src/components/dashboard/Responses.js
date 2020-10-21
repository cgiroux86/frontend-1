import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
export default function Responses() {
  const ticket = useSelector((state) => state.Tickets);
  return (
    <div className="response_container">
      <h3>Responses</h3>
      <div>
        {ticket.selected &&
          ticket.selected.responses &&
          ticket.selected.responses.length > 0 &&
          ticket.selected.responses.map((res, idx) => {
            return (
              <div
                className={idx % 2 ? "response_odd" : "response_even"}
                key={idx}
              >
                {res.first_name && res.last_name && (
                  <div className="response_avatar">
                    <Avatar
                      style={{ color: "white", fontWeight: "bold" }}
                      src={res.image}
                    >
                      {`${res.first_name[0]}${res.last_name[0]}`}
                    </Avatar>
                    <h3>
                      {res.first_name} {res.last_name}
                    </h3>
                  </div>
                )}

                <p>{res.message}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
