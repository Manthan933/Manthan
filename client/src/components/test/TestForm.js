import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stack,
  Button,
  Typography
} from '@material-ui/core';

TestForm.propTypes = {
  count: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

function TestForm({ count, data, handleSubmit }) {
  if (count === 2) {
    document.getElementById('submit').click();
  }
  const defaultValues = {};
  data.forEach((ques) => {
    defaultValues[ques._id] = '';
  });
  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values) => {
        console.log(values);
        handleSubmit(values);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          {data.map((ques, index) => (
            <FormControl key={index} component="fieldset" style={{ width: '100%' }}>
              <Typography variant="h6">{`${index + 1} . `} </Typography>
              {ques.question.includes('data:image/') ? (
                <img height="400px" width="auto" src={ques.question} alt="question" />
              ) : (
                <Typography variant="h6">{ques.question}</Typography>
              )}
              <RadioGroup
                name={ques._id}
                onChange={(event) => {
                  setFieldValue(ques._id, event.currentTarget.value);
                }}
                style={{ width: '70%' }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                  <FormControlLabel value={ques.option1} control={<Radio />} label={ques.option1} />
                  <FormControlLabel value={ques.option2} control={<Radio />} label={ques.option2} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                  <FormControlLabel value={ques.option3} control={<Radio />} label={ques.option3} />
                  <FormControlLabel value={ques.option4} control={<Radio />} label={ques.option4} />
                </Stack>
              </RadioGroup>
            </FormControl>
          ))}
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              disableElevation
              style={{ margin: 10 }}
              variant="contained"
              color="primary"
              type="submit"
              id="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default TestForm;
