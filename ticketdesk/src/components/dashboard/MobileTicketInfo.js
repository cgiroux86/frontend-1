import React, { useState } from "react";
import { useSelector } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
}));

export default function MobileTicketInfo({ ticket }) {
  console.log("TICKET", ticket);
  const user = useSelector((state) => state.User);
  const ticket_info = useSelector((state) => state.Tickets);
  const classes = useStyles();
  const [ticketChanges, setTicketChanges] = useState({
    department: ticket.department ? ticket.department : "",
    assigned: ticket.assigned_first
      ? `${ticket.assigned_first} ${ticket.assigned_last}`
      : "",
    priority: ticket.priority ? ticket.priority : "",
  });

  const shouldDisplayButton = () => {
    return (
      (ticketChanges.priority !== "" &&
        ticketChanges.priority !== ticket.priority) ||
      (ticketChanges.assigned !== "" &&
        ticketChanges.assigned !==
          `${ticket.assigned_first} ${ticket.assigned_last}`) ||
      (ticketChanges.department !== "" &&
        ticketChanges.department !== ticket.department)
    );
  };

  function DropDown({ name }) {
    const handleChange = (e) => {
      setTicketChanges({ ...ticketChanges, [name]: e.target.value });
    };

    return (
      <div>
        {name === "department" ? (
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ticketChanges.department}
              onChange={handleChange}
              style={{ width: "60%", margin: "1% 0" }}
            >
              {ticket_info &&
                ticket_info.department.length > 0 &&
                ticket_info.department.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        ) : name === "assigned" ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ticketChanges.assigned}
            onChange={handleChange}
            style={{ width: "60%", padding: "1% 0" }}
          >
            {user &&
              user.users.length > 0 &&
              user.users.map((user, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={`${user.first_name} ${user.last_name}`}
                  >
                    {`${user.first_name} ${user.last_name}`}
                  </MenuItem>
                );
              })}
          </Select>
        ) : (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ticketChanges.priority}
            onChange={handleChange}
            style={{ width: "60%" }}
          >
            {ticket_info &&
              ticket_info.priority.length > 0 &&
              ticket_info.priority.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
          </Select>
        )}
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        height: "90%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h1>Ticket Info</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3>Description:</h3>
        <span>{` ${ticket.description}`}</span>
      </div>
      <div>
        <strong>Attempted Solutions: </strong>
        {ticket.attempted_solutions}
      </div>
      <div>
        <strong>More Info: </strong>
        {ticket.more_info}
      </div>
      <div>
        <div>
          <strong>Priority: </strong>
        </div>
        {!user.admin ? (
          ticket.priority ? (
            `${ticket.priority}`
          ) : (
            "Not yet assigned"
          )
        ) : (
          <div style={{ width: "100%" }}>
            <DropDown name="priority" />
          </div>
        )}
      </div>
      <div>
        <strong>Assigned: </strong>
        {!user.admin ? (
          ticket.assigned_first ? (
            `${ticket.assigned_first} ${ticket.assigned_last}`
          ) : (
            "Not yet assigned"
          )
        ) : (
          <DropDown name="assigned" />
        )}
      </div>
      <div>
        <strong>Department: </strong>{" "}
        {!user.admin ? (
          ticket.department ? (
            ticket.department
          ) : (
            "No derpatment assigned"
          )
        ) : (
          <DropDown name="department" />
        )}
      </div>
      {shouldDisplayButton() && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "30%",
            position: "realitve",
            top: "30px",
          }}
        >
          Submit Changes?
          <div
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "space-evenly",
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </div>
  );
}
