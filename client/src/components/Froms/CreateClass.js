import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export default function FormDialog(props) {
  const {
    open,
    setOpen,
    createClass,
    updateClass,
    editable = false,
    classDetails,
  } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (editable) => {
    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;
    const subcode = document.getElementById("subcode").value;
    const config = { name: name, subject: subject, subcode: subcode };
    editable ? updateClass(classDetails, config) : createClass(config);
    setOpen(false);
  };

  return (
    <form autoComplete='off'>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          {editable ? "Edit Class" : "Create Class"}
        </DialogTitle>
        <DialogContent>
          <TextField
            inputProps={{
              'data-testid': 'name'
            }}
            autoFocus
            id='name'
            label='Class name'
            defaultValue={classDetails ? classDetails.name : ""}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin='normal'
            id='subject'
            label='Subject'
            defaultValue={classDetails ? classDetails.subject : ""}
            fullWidth
          />
          <TextField
            autoFocus
            margin='normal'
            id='subcode'
            label='Subject Code'
            defaultValue={classDetails ? classDetails.subcode : ""}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => handleClick(editable)}
            type='submit'
            color='primary'
          >
            {editable ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
