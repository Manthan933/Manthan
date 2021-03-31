import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { JoinClass } from '../../actions/classroom';

const JoinForm = ({ JoinClass, match, history }) => {
  const handleClose = () => {
    <Redirect to="/" />;
  };
  const handleClick = () => {
    JoinClass(match.params.code, history);
    <Redirect to="/dashboard" />;
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Join class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Click Join to join the class with code ${match.params.code}. `}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button href="/" color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

JoinForm.propTypes = {
  JoinClass: PropTypes.func.isRequired
};

export default connect(null, { JoinClass })(JoinForm);
