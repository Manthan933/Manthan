import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Typography, Paper, Grid, Button } from '@material-ui/core';
// Picker
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

function DatePickerWrTestFormer(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}

const TestForm = ({ setTest, handleNext, test }) => {
  const onSubmit = async (values) => {
    var duration = new Date(98, 1);
    duration.setHours(values.durationHrs);
    duration.setMinutes(values.durationMins);
    const test = {
      name: values.name,
      marks: values.marks,
      dueDate: values.dueDate,
      duration: duration
    };
    setTest(test);
    handleNext();
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.marks || values.marks === 0) {
      errors.marks = 'Required';
    }
    if (!values.dueDate) {
      errors.dueDate = 'Required';
    }
    if (!values.durationHrs) {
      errors.durationHrs = 'Required';
    }
    if (!values.durationMins) {
      errors.durationMins = 'Required';
    }
    return errors;
  };
  return (
    <div style={{ margin: 'auto', marginTop: '1%', maxWidth: 600 }}>
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Create Test
      </Typography>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Test Form
      </Typography>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{
          name: test.name,
          marks: test.marks,
          dueDate: test.dueDate,
          durationHrs: test.duration.getHours(),
          durationMins: test.duration.getMinutes()
        }}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="marks"
                    fullWidth
                    required
                    component={TextField}
                    type="number"
                    label="Marks"
                  />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={6}>
                    <Field
                      name="dueDate"
                      component={DatePickerWrTestFormer}
                      fullWidth
                      required
                      margin="normal"
                      label="Due Date"
                    />
                  </Grid>
                  <Grid style={{ marginTop: '18px' }} item xs={3}>
                    <Field
                      name="durationHrs"
                      fullWidth
                      required
                      component={TextField}
                      type="number"
                      label="Duration Hrs"
                    />
                  </Grid>
                  <Grid style={{ marginTop: '18px' }} item xs={3}>
                    <Field
                      name="durationMins"
                      fullWidth
                      required
                      component={TextField}
                      type="number"
                      label="Duration Mins"
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item style={{ marginTop: 16 }}>
                  <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
};
TestForm.propTypes = {
  setTest: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired
};

export default TestForm;
