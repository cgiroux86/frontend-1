import React, { useState } from "react";
import Expansion from "./Expansion";
import { useSelector } from "react-redux";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TicketForm from "./TicketForm";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: "80%",
    margin: "0 auto",
  };
}

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
export default function TabletMain({ active, fetchData, choose }) {
  const tickets = useSelector((state) => state.Tickets.tickets);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="tablet_container">
      <div className="tablet_left">
        <div className="tablet_expansion_container">
          <Expansion />
        </div>
      </div>
      <div className="tablet_right">
        <div className="tablet_header">
          <h1>The Queue</h1>
          <div className="tablet_options">
            <div
              id="all"
              onClick={choose}
              className={active.all ? "active" : "inactive"}
            >
              All Tickets
            </div>
            <div
              id="my"
              onClick={choose}
              className={active.my ? "active" : "inactive"}
            >
              My Tickets
            </div>
          </div>
        </div>
        <div className="tablet_ticket_container">
          {tickets &&
            tickets.length > 0 &&
            tickets.map((item) => {
              return (
                <Card
                  // fetchData={fetchData}
                  id={item.ticket_id}
                  key={Math.floor(Math.random() * 10000)}
                  info={item}
                />
              );
            })}
          <div className="tablet_create_ticket">
            <FontAwesomeIcon
              onClick={handleOpen}
              className="mobile_create_ticket"
              icon={faPlusCircle}
            />{" "}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper}>
                <TicketForm
                  //   setSuccess={setSuccess}
                  fetchData={fetchData}
                  setOpen={setOpen}
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
