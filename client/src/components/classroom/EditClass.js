import * as React from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Button,
  MenuItem,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@material-ui/core';

import { editClass } from '../../actions/classroom';

function EditClass({ editClass, classroom: { currClass } }) {
  const [open, setOpen] = React.useState(false);

  const [cover, setCover] = React.useState(currClass.cover);
  const ClassSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Class name required'),
    subject: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    subCode: Yup.string().max(1, 'Too Short!').max(10, 'Too Long!')
  });
  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => setCover(reader.result);
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      title: currClass.title,
      subject: currClass.subject,
      subCode: currClass.subCode
    },
    validationSchema: ClassSchema,
    onSubmit: (values) => {
      editClass(currClass.code, { ...values, cover });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div>
      <MenuItem onClick={handleClickOpen} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
        <Box
          component={Icon}
          icon={settings2Fill}
          sx={{
            mr: 2,
            width: 24,
            height: 24
          }}
        />
        Edit Details
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Class</DialogTitle>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogContent>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Class Name"
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  {...getFieldProps('subject')}
                  error={Boolean(touched.subject && errors.subject)}
                  helperText={touched.subject && errors.subject}
                />
                <TextField
                  fullWidth
                  label="Subject Code"
                  {...getFieldProps('subCode')}
                  error={Boolean(touched.subCode && errors.subCode)}
                  helperText={touched.subCode && errors.subCode}
                />
                <section className="container">
                  <div
                    {...getRootProps({ className: 'dropzone' })}
                    style={{ padding: 15, borderRadius: 15, border: '2px dashed ' }}
                  >
                    <input {...getInputProps()} />
                    <Typography gutterBottom color="inherit" variant="title2" underline="hover">
                      Class cover {acceptedFiles.length ? ` : ${acceptedFiles[0].path}` : null}
                    </Typography>
                    <Typography
                      sx={{ color: 'text.disabled', display: 'block' }}
                      variant="subtitle2"
                      underline="hover"
                    >
                      Drag and drop or click to select image
                    </Typography>
                    <Typography
                      sx={{ color: 'text.disabled', display: 'block' }}
                      variant="subtitle2"
                    >
                      ( Only *.jpeg and *.png format will be accepted )
                    </Typography>
                  </div>
                </section>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={handleClose}>
                Submit
              </Button>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  );
}

EditClass.propTypes = {
  editClass: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  classroom: state.classroom
});

export default connect(mapStateToProps, { editClass })(EditClass);
