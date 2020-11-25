import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function FormDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
  };
  const handleClick = () => {
    const code = document.getElementById('code').value;
    props.joinClass(code)
    props.setOpen(false);
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask your teacher for the class code, then enter it here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Class Code"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
