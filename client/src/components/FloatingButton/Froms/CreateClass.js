import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function FormDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleClick = () => {
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const subcode = document.getElementById('subcode').value;
    console.log({name:name, subject: subject, subcode:subcode});
    props.createClass({name:name, subject: subject, subcode:subcode})
    props.setOpen(false);
  }

  return (
    <form autoComplete="off">
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create class</DialogTitle>
        <DialogContent>

          <TextField autoFocus id="name" label="Class name" fullWidth required/>
          <TextField autoFocus margin="normal" id="subject" label="Subject" fullWidth/>
          <TextField autoFocus margin="normal" id="subcode" label="Subject Code" fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
