import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useRecoilState } from "recoil";
import { ticketState } from "../../recoil/ticketState";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({ dropDownState, name, handleChange }) {
  const classes = useStyles();
  const [ticket, setTicket] = useRecoilState(ticketState);
  const [input, setInput] = useState(
    name === "priority"
      ? ticket.selected.priority
      : `${ticket.selected.assigned_first} ${ticket.selected.assigned_last}` ||
          "Not Assigned"
  );

  return (
    <>
      {name === "priority" ? (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">{name}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={input.toUpperCase()}
            >
              {ticket.priority.map((item, index) => {
                return (
                  <MenuItem
                    value={item.toUpperCase()}
                    onClick={() => {
                      setTicket({
                        ...ticket,
                        selected: {
                          ...ticket.selected,
                          priority: ticket.priority[index].toUpperCase(),
                        },
                      });
                      setInput(item);
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
          {ticket.assigned.length > 0 && (
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">{name}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={input}
              >
                {ticket.assigned.length > 0 &&
                  ticket.assigned.map((item, index) => {
                    return (
                      <MenuItem
                        value={`${item.first_name} ${item.last_name}`}
                        onClick={() => {
                          setTicket({
                            ...ticket,
                            selected: {
                              ...ticket.selected,
                              assigned_to: ticket.assigned[index].id,
                              assigned_first: ticket.assigned[index].first_name,
                              assigned_last: ticket.assigned[index].last_name,
                            },
                          });
                          setInput(`${item.first_name} ${item.last_name}`);
                        }}
                      >
                        {`${item.first_name} ${item.last_name}`}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}
        </div>
      )}
    </>
  );
}
