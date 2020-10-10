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

  const handleCategoryChange = (e) => {
    let name = e.target.getAttribute("name");
    setCategories({ ...categories, [name]: !categories[name] });
  };

  return (
    <MuiThemeProvider theme={TreeTheme}>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        <TreeItem nodeId="1" label="Filter Tickets">
          <TreeItem nodeId="2" label="Categories">
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
          <TreeItem nodeId="6" label="Status">
            <TreeItem nodeId="7" label="Not Started" />
            <TreeItem nodeId="8" label="In Progress" />
            <TreeItem nodeId="9" label="Complete" />
          </TreeItem>
          <TreeItem nodeId="10" label="Assigned To" />
          <TreeItem nodeId="11" label="Urgency">
            <TreeItem nodeId="12" label="Low" />
            <TreeItem nodeId="13" label="Medium" />
            <TreeItem nodeId="14" label="High" />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </MuiThemeProvider>
  );
}
