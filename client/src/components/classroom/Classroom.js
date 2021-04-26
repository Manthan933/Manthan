import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FloatingButton from './CreateTest';
import Chip from '@material-ui/core/Chip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import NotFound from '../layout/NotFound';
import EditClass from './EditClass';
import TestCard from './TestCard';
import { getClass, LeaveClass, getUsers, removeUser } from '../../actions/classroom';
import { getTests } from '../../actions/test';
import { setAlert } from '../../actions/alert';
import { Button, Grid } from '@material-ui/core';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles({
  root: {
    borderRadius: '10px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    minHeight: '200px',
    marginTop: 20
  },

  content: {
    display: 'inline-flex',
    width: '-moz-available'
  },
  action: {
    flexGrow: ' 1',
    marginInlineStart: '1.5%',
    position: 'relative'
  },

  options: {
    width: 'max-content',
    position: 'absolute',
    right: 0
  },
  generate: {
    display: 'flex'
  },
  copylink: {
    fontWeight: 'bold',
    margin: 0
  },
  details: {
    flexGrow: ' 1',
    marginInlineStart: '1.5%'
  },
  avatar: {
    background: '#4285f4'
  },

  list: {
    margin: '10px'
  },
  chips: {
    margin: '5px'
  },
  edit: {
    margin: '5px',
    cursor: 'pointer',
    float: 'right'
  },
  close: {
    margin: '5px',
    cursor: 'pointer',
    float: 'right'
  }
});

const Classroom = ({
  getClass,
  getUsers,
  removeUser,
  setAlert,
  getTests,
  LeaveClass,
  classroom: { classroom, users, loading: classLoading },
  auth: { user, loading: authLoading },
  test: { tests, loading: testLoading },
  history,
  match
}) => {
  const classes = useStyles();
  const [displayUsers, setDisplayUsers] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getClass(match.params.code);
  }, [getClass, match.params.code]);
  useEffect(() => {
    getUsers(match.params.code);
  }, [getUsers, match.params.code]);
  useEffect(() => {
    getTests(match.params.code);
  }, [getTests, match.params.code]);
  const onLinkClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${classroom.code}`);
    setAlert('Invite Link Copied.');
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClass = () => {
    setEditForm(true);
    setAnchorEl(null);
  };
  if (classLoading || authLoading || testLoading) return <Spinner />;
  if (!classroom) {
    return <NotFound />;
  }

  const admin = user.id === classroom.admin._id;
  return (
    <Container>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <div className={classes.details}>
            <Typography variant="h3">{classroom.name}</Typography>
            <Typography variant="subtitle1">Subject : {classroom.subject}</Typography>
            <Typography variant="subtitle1">Subject Code : {classroom.subcode}</Typography>
            <Typography variant="subtitle1">Instructor : {classroom.admin.name}</Typography>
            {admin === true ? (
              <Typography variant="subtitle1">Class code : {classroom.code}</Typography>
            ) : null}
            <div style={{ display: 'flex' }}>
              <Button className={classes.copylink} onClick={onLinkClick}>
                Copy Invite Link
              </Button>
            </div>
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
                <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                  <MenuItem onClick={handleEditClass}>Edit</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setDisplayUsers(true);
                      handleClose();
                    }}
                  >
                    Remove Students
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      LeaveClass(classroom.code, history, true);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>
      <EditClass open={editForm} setOpen={setEditForm} />
      {displayUsers === true ? (
        <div className={classes.list}>
          <Typography variant="h6" className={classes.title}>
            {classroom.users.length <= 1
              ? 'No Student enrolled in class or already removed!'
              : 'Delete Students from Class!'}
            <CloseIcon className={classes.close} onClick={() => setDisplayUsers(false)} />
          </Typography>
          <div className={classes.demo}>
            {users.map((user, index) => {
              return (
                classroom.admin._id !== user._id && (
                  <Chip
                    className={classes.chips}
                    key={index}
                    icon={<AccountCircleIcon />}
                    label={user.email}
                    onDelete={() => removeUser(classroom.code, user)}
                    color="primary"
                  />
                )
              );
            })}
          </div>
        </div>
      ) : (
        <Grid container alignItems="flex-start" spacing={2}>
          {tests.map((Test) => {
            return (
              <Grid key="1" item md={6} xs={12}>
                <TestCard key={Test._id} id={Test._id} test={Test.test} admin={admin} />
              </Grid>
            );
          })}
        </Grid>
      )}

      {admin === true ? (
        <FloatingButton href={`/create/${classroom.code}`} text="Create Test" />
      ) : null}
    </Container>
  );
};

Classroom.propTypes = {
  getClass: PropTypes.func.isRequired,
  LeaveClass: PropTypes.func.isRequired,
  getTests: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  test: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  classroom: state.classroom,
  auth: state.auth,
  test: state.test
});

export default connect(mapStateToProps, {
  getClass,
  getUsers,
  removeUser,
  LeaveClass,
  setAlert,
  getTests
})(withRouter(Classroom));
