import * as React from 'react';
import {
  Button,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
        Join Class
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join new class, please enter the unique class code.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            label="Class Code"
            type="test"
            id="code"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Join</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
