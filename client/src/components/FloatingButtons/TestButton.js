import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

import Styles from "../../assets/jss/components/FloatingButton/FloatingButtonStyles";

const useStyles = makeStyles(Styles);

export default function FloatingButton(props) {
  const classes = useStyles();
  const { text, href } = props;
  return (
    <div>
      <Tooltip title={text} aria-label='add'>
        <Fab
          className={classes.addicon}
          color='secondary'
          href={href}
          aria-label='add'
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
