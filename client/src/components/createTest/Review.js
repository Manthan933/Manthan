// material

import PropTypes from 'prop-types';
import { Stack, Button, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

function Review({ handleBack, handleSubmit, details, questions, rules }) {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Details</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} style={{ position: 'relative' }}>
        <Typography variant="subtitle1" style={{ position: 'absolute', left: 0 }}>
          Name : {details.name}
        </Typography>

        <Typography variant="subtitle1" style={{ position: 'absolute', right: 0 }}>
          Marks : {details.marks}
        </Typography>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} style={{ position: 'relative' }}>
        <Typography variant="subtitle1" style={{ position: 'absolute', left: 0 }}>
          Due Date : {details.dueDate.toDateString()}
        </Typography>

        <Typography variant="subtitle1" style={{ position: 'absolute', right: 0 }}>
          Duration : {`${details.durationHrs} hrs ${details.durationMin} min`}
        </Typography>
      </Stack>
      <Typography variant="h5">Questions</Typography>
      <Stack spacing={3}>
        <ol>
          {questions.map((curr, index) => (
            <li key={index}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">
                  {curr.question.includes('data:image/') ? (
                    <img src={curr.question} alt="question" />
                  ) : (
                    curr.question
                  )}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={15}>
                  <Typography variant="subtitle1">(a) {curr.option1}</Typography>

                  <Typography variant="subtitle1">(b) {curr.option2}</Typography>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={15}>
                  <Typography variant="subtitle1">(c) {curr.option3}</Typography>

                  <Typography variant="subtitle1">(d) {curr.option4}</Typography>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={15}>
                  <Typography variant="subtitle1">Ans : {curr.answer}</Typography>
                  <Typography variant="subtitle1">Type : {curr.type}</Typography>
                </Stack>
              </Stack>
            </li>
          ))}
        </ol>
      </Stack>
      <Typography variant="h5">Rules</Typography>
      <Stack spacing={3}>
        <ol>
          {rules.map((rule, index) => (
            <li key={index}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Typography variant="subtitle1">Type : {rule.type}</Typography>
                <Typography variant="subtitle1">Number of Questions : {rule.noofques} </Typography>
                <Typography variant="subtitle1">Marks per Question : {rule.marks} </Typography>
              </Stack>
            </li>
          ))}
        </ol>
      </Stack>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0 }}>
          <Button style={{ margin: 5 }} onClick={handleBack}>
            Back
          </Button>
          <Button
            disableElevation
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </Stack>
  );
}

Review.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  rules: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired
};

export default Review;
