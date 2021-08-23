import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { joinClass } from '../actions/user';
import { parseURLParams } from '../utils/parseUrlParams';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const JoinForm = ({ joinClass }) => {
  const { code } = parseURLParams(String(window.location));
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  };
  const handleClick = () => {
    joinClass(code);
    navigate('/dashboard');
  };

  return (
    <RootStyle>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join class</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Click Join to join the class with code :  ${code} `}</DialogContentText>
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
    </RootStyle>
  );
};

JoinForm.propTypes = {
  joinClass: PropTypes.func.isRequired
};

export default connect(null, { joinClass })(JoinForm);
