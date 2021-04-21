import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { createClassFormError } from '../dashboard/handleFormError';
import { editClass } from '../../actions/classroom';

const EditFrom = ({ open, setOpen, editClass, classroom: { classroom } }) => {
  const handleClose = () => {
    setClassError(null);
    setSubjectCodeError(null);
    setSubjectError(null);
    setOpen(false);
  };

  // for better purpose i split all error state
  const [classError, setClassError] = React.useState('');
  const [subjectError, setSubjectError] = React.useState('');
  const [subjectCodeError, setSubjectCodeError] = React.useState('');
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
      setClassError,
      setSubjectCodeError,
      setSubjectError
    );

    if (!isContainError) {
      const config = { name: name, subject: subject, subcode: subcode };
      editClass(classroom.code, config);
      setOpen(false);
    }
  };

  return (
    <form autoComplete="off">
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Class</DialogTitle>
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
            defaultValue={classroom.name}
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
            defaultValue={classroom.subject}
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
            defaultValue={classroom.subcode}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClick()} type="submit" color="primary">
            {'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

EditFrom.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  editClass: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  classroom: state.classroom
});

export default connect(mapStateToProps, { editClass })(EditFrom);
