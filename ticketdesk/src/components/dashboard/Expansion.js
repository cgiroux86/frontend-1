import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const TreeTheme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
      },
    },
    MuiSelect: {
      select: {
        "&:focus": {
          background: "white",
          outline: "none",
        },
      },
    },
  },
});
const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    flexGrow: 1,
    disableFocus: true,
  },
  child: {
    width: "90%",
    cursor: "pointer",
    marginLeft: 25,
    "&.Mui-selected": {
      outline: "none",
      background: "none",
    },
  },
  active: {
    width: "90%",
    background: "lightblue",
    cursor: "pointer",
    marginLeft: 25,
  },
});

export default function MultiSelectTreeView() {
  const classes = useStyles();
  const [categories, setCategories] = useState({
    general: false,
    tech: false,
    personel: false,
  });
  const [status, setStatus] = useState({
    not_started: false,
    in_progress: false,
    complete: false,
  });

  const [urgency, setUrgency] = useState({
    low: false,
    medium: false,
    high: false,
  });

  const [sortItems, setSortItems] = useState({
    submit: false,
    urgency: false,
    category: false,
  });

  const handleCategoryChange = (e) => {
    let name = e.target.getAttribute("name");
    setCategories({ ...categories, [name]: !categories[name] });
  };

  const handleStatusChange = (e) => {
    let name = e.target.getAttribute("name");
    setStatus({ ...status, [name]: !status[name] });
  };

  const handleUrgencyChange = (e) => {
    let name = e.target.getAttribute("name");
    setUrgency({ ...urgency, [name]: !urgency[name] });
  };

  const handleSortChange = (e) => {
    let name = e.target.getAttribute("name");
    setSortItems({ ...sortItems, [name]: !sortItems[name] });
  };

  return (
    <MuiThemeProvider theme={TreeTheme}>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        <TreeItem
          nodeId="1"
          label={
            <Typography style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
              Filter Tickets
            </Typography>
          }
        >
          <TreeItem
            nodeId="2"
            label={
              <Typography style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Categories
              </Typography>
            }
          >
            <Typography
              name="general"
              onClick={(e) => handleCategoryChange(e)}
              className={categories.general ? classes.active : classes.child}
            >
              General
            </Typography>
            <Typography
              name="personel"
              onClick={(e) => handleCategoryChange(e)}
              className={categories.personel ? classes.active : classes.child}
            >
              Personel
            </Typography>
            <Typography
              name="tech"
              onClick={(e) => handleCategoryChange(e)}
              className={categories.tech ? classes.active : classes.child}
            >
              Technology
            </Typography>
          </TreeItem>
          <TreeItem
            nodeId="6"
            label={
              <Typography style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Status
              </Typography>
            }
          >
            <Typography
              name="not_started"
              onClick={(e) => handleStatusChange(e)}
              className={status.not_started ? classes.active : classes.child}
            >
              Not Started
            </Typography>
            <Typography
              name="in_progress"
              onClick={(e) => handleStatusChange(e)}
              className={status.in_progress ? classes.active : classes.child}
            >
              In Progress
            </Typography>
            <Typography
              name="complete"
              onClick={(e) => handleStatusChange(e)}
              className={status.complete ? classes.active : classes.child}
            >
              Complete
            </Typography>
          </TreeItem>
          <TreeItem
            nodeId="11"
            label={
              <Typography style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Urgency
              </Typography>
            }
          >
            <Typography
              name="low"
              onClick={(e) => handleUrgencyChange(e)}
              className={urgency.low ? classes.active : classes.child}
            >
              Low
            </Typography>
            <Typography
              name="medium"
              onClick={(e) => handleUrgencyChange(e)}
              className={urgency.medium ? classes.active : classes.child}
            >
              Medium
            </Typography>
            <Typography
              name="high"
              onClick={(e) => handleUrgencyChange(e)}
              className={urgency.high ? classes.active : classes.child}
            >
              High
            </Typography>
          </TreeItem>
        </TreeItem>
        <TreeItem
          nodeId="20"
          label={
            <Typography style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
              Sort Tickets
            </Typography>
          }
        >
          <Typography
            name="urgency"
            onClick={handleSortChange}
            className={sortItems.urgency ? classes.active : classes.child}
          >
            Urgency
          </Typography>
          <Typography
            onClick={handleSortChange}
            name="submit"
            className={sortItems.submit ? classes.active : classes.child}
          >
            Submitted
          </Typography>
          <Typography
            onClick={handleSortChange}
            name="category"
            className={sortItems.category ? classes.active : classes.child}
          >
            Category
          </Typography>
        </TreeItem>
      </TreeView>
    </MuiThemeProvider>
  );
}
