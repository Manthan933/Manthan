import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm(props) {
  const {
    name,
    marks,
    durationHrs,
    durationMins,
    dueDate,
    setName,
    setMarks,
    setDurationHrs,
    setDurationMins,
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
  const handleDurationHoursChange = (e) => {
    const durationHrs = parseInt(e.target.value);
    setDurationHrs(durationHrs);
  };
  const handleDurationMinutesChange = (e) => {
    const durationMins = parseInt(e.target.value);
    setDurationMins(durationMins);
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
          <Grid item xs={6} sm={3}>
          <TextField
              id='DurationHours'
              name='hours'
              label='Hours'
              type='number'
              min="0" 
              max="10"
              value={durationHrs || 0}
              fullWidth
              onChange={(e) => handleDurationHoursChange(e)}
            />
            </Grid>
            <Grid item xs={6} sm={3}>
            <TextField
              required
              id='DurationMinutes'
              name='minutes'
              label='Minutes'
              type='number'
              min="10" 
              max="60"
              value={durationMins || 0}
              fullWidth
              onChange={(e) => handleDurationMinutesChange(e)}
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
