import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
    "&:hover > $content": {
      backgroundColor: "transparent",
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: "transparent",
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent",
    },
  },
});
export default function Sort() {
  const classes = useStyles();
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem
        nodeId="1"
        label={
          <Typography style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            Sort Tickets
          </Typography>
        }
      >
        <Typography>Submit Date</Typography>
        <Typography>Urgency</Typography>
        <Typography>Category</Typography>
      </TreeItem>
    </TreeView>
  );
}
