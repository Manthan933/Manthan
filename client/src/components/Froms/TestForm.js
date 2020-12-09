import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm(props) {
  const {
    name,
    marks,
    duration,
    dueDate,
    setName,
    setMarks,
    setDuration,
    setDueDate,
  } = props;
  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const handleMarksChange = (e) => {
    const marks = e.target.value;
    setMarks(marks);
  };
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Test Details
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='Name'
              name='name'
              label='Name'
              type='text'
              fullWidth
              value={name}
              onChange={(e) => handleNameChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='marks'
              name='marks'
              label='Marks'
              type='number'
              value={marks}
              onChange={(e) => handleMarksChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                label='Due Date'
                value={dueDate}
                onChange={setDueDate}
                onError={console.log}
                disablePast
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                ampm={false}
                label='Duration'
                value={duration}
                onChange={setDuration}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
