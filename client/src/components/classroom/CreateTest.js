import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() => ({
  addicon: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}));
const FloatingButton = ({ text, href }) => {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title={text} aria-label="add">
        <Fab className={classes.addicon} color="secondary" href={href} aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

FloatingButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default FloatingButton;
