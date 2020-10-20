import { faRProject } from "@fortawesome/free-brands-svg-icons";
import { Avatar } from "@material-ui/core";
import React from "react";
import { useRecoilValue } from "recoil";
import { ticketState } from "../../recoil/ticketState";

export default function Responses() {
  const ticket = useRecoilValue(ticketState);
  return (
    <div className="response_container">
      <h3>Responses</h3>
      <div>
        {ticket.responses.responses &&
          ticket.responses.responses.length > 0 &&
          ticket.responses.responses.map((res, idx) => {
            console.log(res);
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
