import React from "react";
import { Avatar } from "@material-ui/core";
import { getPriority } from "../../utils/functions";

export default function Card({ info }) {
  return (
    <div className="card">
      <div className={getPriority(info.priority)}></div>
      <div className="age_text">
        <p>
          {info.age}
          <br />
          days
          <br />
          old
        </p>
      </div>
      <div className="card_middle">
        <h2>{info.title}</h2>
        <p>{info.description}</p>
      </div>
      <div className="card_right">
        {info.assigned_to && (
          <div>
            <Avatar
              style={{ color: "white", fontWeight: "bold" }}
              src={info.image}
            >{`${info.assigned_to.split(" ")[0][0]}${
              info.assigned_to.split(" ")[1][0]
            }`}</Avatar>
          </div>
        )}
      </div>
    </div>
  );
}
