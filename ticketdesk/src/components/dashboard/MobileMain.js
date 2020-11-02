import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TicketForm from "./TicketForm";
import { makeStyles } from "@material-ui/core/styles";

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

export default function MobileMain({
  setSuccess,
  fetchData,
  active,
  setActive,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const choose = (e) => {
    if (e.target.id === "all") {
      setActive({
        all: true,
        my: false,
      });
    } else if (e.target.id === "my") {
      setActive({
        all: false,
        my: true,
      });
    }
  };
  return (
    <div>
      <div className="mobile_header">
        <div className="mobile_title">
          <h2>The Queue</h2>
        </div>
        <div className="mobile_options_container">
          <div
            id="all"
            onClick={choose}
            className={active.all ? "active" : "main_button"}
          >
            All Tickets
          </div>
          <div
            id="my"
            onClick={choose}
            className={active.my ? "active" : "main_button"}
          >
            My Tickets
          </div>
        </div>
      </div>
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
            setSuccess={setSuccess}
            fetchData={fetchData}
            setOpen={setOpen}
          />
        </div>
      </Modal>
    </div>
  );
}
