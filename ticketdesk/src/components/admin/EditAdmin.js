import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import { useDispatch } from "react-redux";
import { setAllUsers } from "../../redux/actions/userActions";
const useStyles = makeStyles((theme) => ({
  root: { width: "50%", height: "80%", margin: "0 auto", position: "relative" },
  backDrop: {
    background: "white",
  },
}));

export default function AlertDialog({ admin, id, user }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdminChange = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    const updates = { admin: true, id };
    AxiosWithAuth()
      .put("/users/update", updates)
      .then((res) => fetchUsers())
      .catch((err) => console.log(err));
  };

  const fetchUsers = () => {
    AxiosWithAuth()
      .get("/users")
      .then((res) => {
        dispatch(setAllUsers(res.data));
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <strong>Admin: </strong>
        {
          <input
            onChange={handleAdminChange}
            checked={admin}
            type="checkbox"
          ></input>
        }
      </div>
      <Dialog
        className={classes.root}
        open={open}
        modal={false}
        onClose={handleClose}
        hideBackdrop
        PaperProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`You are about to promote ${user} to Admin. Are you sure?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FontAwesomeIcon icon={faBan} />
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
