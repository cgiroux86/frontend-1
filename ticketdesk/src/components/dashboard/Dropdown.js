import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  updateAssigned,
  updatePriority,
} from "../../redux/actions/ticketActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({ name }) {
  const classes = useStyles();
  const ticket = useSelector((state) => state.Tickets);
  const users = useSelector((state) => state.User);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(state, "USERS IN DROPDOWN");
  }, [state]);

  return (
    <>
      {name === "priority" ? (
        <div>
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-label">{name}</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ticket.selected.priority || "No Priority"}
            >
              {ticket.priority.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={item.toUpperCase()}
                    onClick={() => {
                      console.log("ITEM", item);
                      dispatch(updatePriority(item.toUpperCase()));
                      // setTicket({
                      //   ...ticket,
                      //   selected: {
                      //     ...ticket.selected,
                      //     priority: ticket.priority[index].toUpperCase(),
                      //   },
                      // });
                      // setInput(item);
                    }}
                  >
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      ) : (
        <div>
          {/* {ticket.assigned.length > 0 && ( */}
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-label">{name}</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={`${ticket.selected.assigned_first} ${ticket.selected.assigned_last}`}
            >
              {users &&
                users.users.length > 0 &&
                users.users.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={`${item.first_name} ${item.last_name}`}
                      onClick={() => {
                        dispatch(
                          updateAssigned({
                            id: item.id,
                            first_name: item.first_name,
                            last_name: item.last_name,
                          })
                        );
                      }}
                    >
                      {`${item.first_name} ${item.last_name}`}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          {/* )} */}
        </div>
      )}
    </>
  );
}
