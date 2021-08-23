import * as React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
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

import { joinClass } from '../../../actions/user';

function JoinClass({ joinClass }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const ClassSchema = Yup.object().shape({
    code: Yup.string().min(6, 'Too Short!').max(6, 'Too Long!').required('Class code required')
  });
  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema: ClassSchema,
    onSubmit: (values) => {
      console.log(values.code);
      joinClass(values.code);
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <div>
      <MenuItem onClick={handleClickOpen} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
        Join Class
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join Class</DialogTitle>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                {...getFieldProps('code')}
                error={Boolean(touched.code && errors.code)}
                helperText={touched.code && errors.code}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Join</Button>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  );
}

JoinClass.propTypes = {
  joinClass: PropTypes.func.isRequired
};

export default connect(null, { joinClass })(JoinClass);
