import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import { deleteTest } from '../../actions/test';

const useStyles = makeStyles({
  root: {
    borderRadius: '10px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    marginTop: 20
  },

  content: {
    display: 'inline-flex',
    width: '-moz-available'
  },
  details: {
    flexGrow: ' 1',
    marginInlineStart: '1.5%'
  },
  action: {
    flexGrow: ' 1',
    marginInlineStart: '1.5%',
    position: 'relative'
  },

  button: {
    width: 'max-content',
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  options: {
    width: 'max-content',
    position: 'absolute',
    right: 0
  }
});

const TestCard = ({ admin, test, id, deleteTest }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dueDate = new Date(test.dueDate);
  const duration = new Date(test.duration);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.details}>
          <Typography variant="h4">{test.name}</Typography>
          <Typography variant="subtitle1">Marks : {test.marks}</Typography>
          <Typography variant="subtitle1">
            Due Date : {dueDate.toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1">
            {`Duration : ${duration.getHours()} hrs ${duration.getMinutes()} min`}
          </Typography>
        </div>
        <div className={classes.action}>
          {admin === true ? (
            <>
              <IconButton
                className={classes.options}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Check Scores
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    deleteTest(id);
                    handleClose();
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </>
          ) : null}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!admin}
            href={`/test/${id}`}
          >
            Start Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

TestCard.propTypes = {
  test: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  deleteTest: PropTypes.func.isRequired
};

export default connect(null, { deleteTest })(TestCard);
