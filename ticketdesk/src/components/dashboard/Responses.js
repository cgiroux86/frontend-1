import React from "react";
import { useSelector } from "react-redux";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ResponseExpansionPanel({ res, idx }) {
  console.log("RES", res);
  return (
    <div>
      <ExpansionPanel
        className={idx % 2 ? "response_odd" : "response_even"}
        key={idx}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {res.first_name && res.last_name && (
            <div className="response_avatar">
              <Avatar
                style={{ color: "white", fontWeight: "bold" }}
                src={res.image}
              >
                {`${res.first_name[0]}${res.last_name[0]}`}
              </Avatar>
              <Typography>
                {res.first_name} {res.last_name}
              </Typography>
            </div>
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{res.message}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
export default function Responses() {
  const ticket = useSelector((state) => state.Tickets);
  return (
    <div>
      <h3 style={{ textAlign: "center", margin: "0" }}>Responses</h3>
      <div className="view_response_container">
        <div>
          {ticket.selected &&
            ticket.selected.responses &&
            ticket.selected.responses.length > 0 &&
            ticket.selected.responses.map((res, idx) => {
              return (
                <div key={idx}>
                  <ResponseExpansionPanel res={res} idx={idx} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
