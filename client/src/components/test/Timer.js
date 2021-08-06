import React from 'react';
import { Stack, Typography } from '@material-ui/core';

export default function Timer() {
  const [seconds, setSeconds] = React.useState(10);
  const [minutes, setMinutes] = React.useState(1);
  const [hours, setHours] = React.useState(0);

  React.useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      window.alert('Time UP !!!!');
    }
    if (seconds === 0 && minutes === 0) {
      setTimeout(() => {
        setSeconds(59);
        setMinutes(59);
        if (hours > 0) setHours(hours - 1);
      }, 1000);
    }
    if (seconds === 0) {
      setTimeout(() => {
        setSeconds(59);
        if (minutes > 0) {
          setMinutes(minutes - 1);
        }
      }, 1000);
    }
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  });

  return (
    <Stack direction="row">
      <Typography variant="h5" style={{ margin: 'auto' }}>
        Time Left :
      </Typography>
      <Typography
        variant="h5"
        style={{ marginLeft: '10px', padding: '10px', border: '1px solid', borderRadius: 50 }}
      >{`${hours} hrs : ${minutes} min : ${seconds} sec`}</Typography>
    </Stack>
  );
}
