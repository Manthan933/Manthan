import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { createClassFormError } from './handleFormError';
import { CreateClass } from '../../actions/classroom';

const CreateForm = ({ open, setOpen, CreateClass }) => {
  const handleClose = () => {
    setClassError(null);
    setSubjectCodeError(null);
    setSubjectError(null);
    setOpen(false);
    setImage(null);
    setImageError(null);
  };

  // for better purpose i split all error state
  const [classError, setClassError] = React.useState('');
  const [subjectError, setSubjectError] = React.useState('');
  const [subjectCodeError, setSubjectCodeError] = React.useState('');
  const [imageError, setImageError] = React.useState('');
  const [image, setImage] = React.useState(null);
  const handleClick = () => {
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const subcode = document.getElementById('subcode').value;

    // Check before submitting
    // move all Error handling section to new handleFormErrorFile
    const isContainError = createClassFormError(
      name,
      subject,
      subcode,
      image,
      setClassError,
      setSubjectCodeError,
      setSubjectError,
      setImageError
    );

    if (!isContainError) {
      const data = new FormData();
      data.append('name', name);
      data.append('subject', subject);
      data.append('subcode', subcode);
      data.append('image', image);

      CreateClass(data);
      setOpen(false);
      setImage(null);
      setImageError(null);
    }
  };

  return (
    <form autoComplete="off">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Class</DialogTitle>
        <DialogContent>
          <TextField
            error={!!classError}
            helperText={classError}
            inputProps={{
              maxlength: 12
            }}
            autoFocus
            id="name"
            label="Class name"
            defaultValue={''}
            fullWidth
            required
          />
          <TextField
            error={!!subjectError}
            autoFocus
            margin="normal"
            id="subject"
            label="Subject"
            helperText={subjectError}
            defaultValue={''}
            fullWidth
            required
          />
          <TextField
            error={!!subjectCodeError}
            autoFocus
            helperText={subjectCodeError}
            margin="normal"
            id="subcode"
            label="Subject Code"
            defaultValue={''}
            fullWidth
            required
          />
          <br />
          <br />
          <label
            style={{
              backgroundColor: 'indigo',
              padding: '10px 20px',
              color: 'white',
              cursor: 'pointer'
            }}
            htmlFor="image"
          >
            Upload class image
          </label>
          <input
            style={{ display: 'none' }}
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
          />
          {image ? <p>{image.name}</p> : null}
          {imageError ? <p style={{ color: 'red' }}>{imageError}</p> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClick()} type="submit" color="primary">
            {'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

CreateForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  CreateClass: PropTypes.func.isRequired
};

export default connect(null, { CreateClass })(CreateForm);
