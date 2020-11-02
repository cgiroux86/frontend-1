import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosWithAuth from "../../utils/axiosWithAuth";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: "60%",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "30%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  admin_modal_card: {
    borderRadius: "10px",
    background: "#f9fafb",
    margin: "1%",
    padding: "1%",
  },
}));

export default function SimpleModal({ icon, data, id, userName, color }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [userTickets, setUserTickets] = useState([]);
  const [assignedTickets, setAssignedTickets] = useState([]);

  const handleOpen = () => {
    if (data === "user") {
      setAssignedTickets([]);
      axiosWithAuth()
        .get(`/users/tickets/${id}`)
        .then((res) => setUserTickets(res.data))
        .catch((err) => console.log(err));
    }
    if (data === "assigned") {
      setUserTickets([]);
      axiosWithAuth()
        .get(`/users/tickets/assigned/${id}`)
        .then((res) => setAssignedTickets(res.data))
        .catch((err) => console.log(err));
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="create_ticket">
      {userTickets && (
        <div onClick={handleOpen} className="modal_button_container">
          <FontAwesomeIcon
            className="modal_button"
            style={{
              color,
            }}
            icon={icon}
          />
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {data === "user" ? (
          <div style={modalStyle} className={classes.paper}>
            <h1>{`${userName}'s Tickets`}</h1>
            {userTickets &&
              userTickets.length > 0 &&
              userTickets.map((ticket) => {
                return (
                  <div className={classes.admin_modal_card} key={ticket.id}>
                    <h3>Description: {ticket.description}</h3>
                    <h5>
                      Attempted Solutions:{" "}
                      <span>{ticket.attempted_solutions}</span>
                    </h5>
                    <p>Priority: {ticket.priority || "No priority assigned"}</p>
                    <p>Status: {ticket.status || "Not Started"}</p>
                  </div>
                );
              })}
          </div>
        ) : (
          <div style={modalStyle} className={classes.paper}>
            <h1>{`${userName}'s Assigned Tickets`}</h1>
            {assignedTickets.length > 0 ? (
              assignedTickets.map((ticket) => {
                return (
                  <div className={classes.admin_modal_card} key={ticket.id}>
                    <h2>Description: {ticket.description}</h2>
                    <p>Attempted Solutions: {ticket.attempted_solutions}</p>
                    <p>Priority: {ticket.priority}</p>
                    <p>Status: {ticket.status}</p>
                  </div>
                );
              })
            ) : (
              <div>No Tickets to Display</div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
