import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@material-ui/core';

Timer.propTypes = {
  timer: PropTypes.array.isRequired,
  setTimer: PropTypes.func.isRequired
};

export default function Timer({ timer, setTimer }) {
  React.useEffect(() => {
    if (timer[0] === 0 && timer[1] === 0 && timer[2] === 0) {
      setTimer([0, 0, 0]);
    } else if (timer[2] === 0 && timer[1] === 0) {
      setTimeout(() => {
        setTimer([timer[0] - 1, 59, 59]);
      }, 1000);
    } else if (timer[2] === 0) {
      setTimeout(() => {
        setTimer([timer[0], timer[1] - 1, 59]);
      }, 1000);
    } else if (timer[2] > 0) {
      setTimeout(() => setTimer([timer[0], timer[1], timer[2] - 1]), 1000);
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
      >{`${timer[0]} hrs : ${timer[1]} min : ${timer[2]} sec`}</Typography>
    </Stack>
  );
}
