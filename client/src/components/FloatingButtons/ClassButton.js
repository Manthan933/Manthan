import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import JoinClass from "../Froms/JoinClass";
import CreateClass from "../Froms/CreateClass";

const useStyles = makeStyles((theme) => ({
  addicon: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

export default function FloatingButton(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [createClass, setCreateClass] = React.useState(false);
  const [joinClass, setJoinClass] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleJoinClass = () => {
    setJoinClass(true);
    setAnchorEl(null);
  };

  const handleCreateClass = () => {
    setCreateClass(true);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Tooltip title={props.text} aria-label='add'>
        <Fab
          className={classes.addicon}
          aria-describedby={id}
          color='secondary'
          onClick={handleClick}
          aria-label='add'
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
      >
        <List component='nav' aria-label='main mailbox folders'>
          <ListItem button onClick={handleJoinClass}>
            <ListItemText primary='Join Class' />
          </ListItem>
          <ListItem button onClick={handleCreateClass}>
            <ListItemText primary='Create Class' />
          </ListItem>
        </List>
      </Popover>
      <JoinClass
        open={joinClass}
        setOpen={setJoinClass}
        joinClass={props.JoinClass}
      />
      <CreateClass
        open={createClass}
        setOpen={setCreateClass}
        createClass={props.CreateClass}
      />
    </div>
  );
}
