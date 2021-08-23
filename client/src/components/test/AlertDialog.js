import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

AlertDialog.propTypes = {
  setFocus: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  setCount: PropTypes.func.isRequired
};

export default function AlertDialog({ setCount, setFocus, children }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setFocus(true);
    setCount((count) => count + 1);
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning !!!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
