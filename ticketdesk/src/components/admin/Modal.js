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
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ icon, data, id }) {
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
      <div onClick={handleOpen} className="modal_button_container">
        <FontAwesomeIcon className="modal_button" icon={icon} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {data === "user" ? (
          <div style={modalStyle} className={classes.paper}>
            {userTickets &&
              userTickets.length > 0 &&
              userTickets.map((ticket) => {
                return (
                  <div key={ticket.id}>
                    <h2>{ticket.description}</h2>
                    <p>{ticket.attempted_solutions}</p>
                    <p>{ticket.priority}</p>
                  </div>
                );
              })}
          </div>
        ) : (
          <div style={modalStyle} className={classes.paper}>
            {assignedTickets.length > 0 ? (
              assignedTickets.map((ticket) => {
                return (
                  <div key={ticket.id}>
                    <h2>{ticket.description}</h2>
                    <p>{ticket.attempted_solutions}</p>
                    <p>{ticket.priority}</p>
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
