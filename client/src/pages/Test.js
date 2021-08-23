import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, Container, Typography, Paper } from '@material-ui/core';
// components
import Page from '../components/Page';
import TestForm from '../components/test/TestForm';
import CountdownTimer from '../components/test/Timer';
import AlertDialog from '../components/test/AlertDialog';
import { parseURLParams } from '../utils/parseUrlParams';
import { startTest, submitTest } from '../actions/test';

// ----------------------------------------------------------------------

function Test({ classroom: { currTest }, startTest, submitTest }) {
  const { test } = parseURLParams(String(window.location));
  const navigate = useNavigate();
  const [Focus, setFocus] = useState(true);
  const [Count, setCount] = useState(0);
  const [timer, setTimer] = useState([]);
  useEffect(() => {
    if (currTest === null) startTest(test);
  }, [currTest, startTest, test]);
  useEffect(() => {
    const handleActivityFalse = () => {
      setFocus(false);
    };
    window.addEventListener('blur', handleActivityFalse);
    return () => {
      window.removeEventListener('blur', handleActivityFalse);
    };
  }, []);

  if (currTest === null) {
    return null;
  }
  const { duration } = currTest;
  if (timer.length === 0) {
    setTimer([parseInt(duration.hrs, 10), parseInt(duration.min, 10), 0]);
  }
  if (timer[0] === 0 && timer[1] === 0 && timer[2] === 0 && Count < 2) {
    setCount(2);
    window.alert('Time Up !!!');
  }

  const handleSubmit = (values) => {
    submitTest(test, values);
    navigate('/dashboard');
  };

  return (
    <Page>
      <Container component={Paper} elevation={5} maxWidth="md" style={{ padding: '2.5%' }}>
        <Stack direction="row" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Test : {currTest.name}
          </Typography>
          <CountdownTimer timer={timer} setTimer={setTimer} />
        </Stack>
        <Container>
          <TestForm data={currTest.data} count={Count} handleSubmit={handleSubmit} />
        </Container>
      </Container>
      {!Focus ? (
        <AlertDialog count={Count} setCount={setCount} setFocus={setFocus}>
          {Count === 1
            ? 'You did it again, your test is going to submit.'
            : 'This is detected that you moved away form the test. Repeating this action will submitthe test automatically.'}
        </AlertDialog>
      ) : null}
    </Page>
  );
}

Test.propTypes = {
  classroom: PropTypes.object.isRequired,
  startTest: PropTypes.func.isRequired,
  submitTest: PropTypes.func.isRequired
};

const matchStateToProps = (state) => ({
  classroom: state.classroom
});

export default connect(matchStateToProps, { startTest, submitTest })(Test);
