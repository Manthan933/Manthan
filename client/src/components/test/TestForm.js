import React from 'react';
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

function App() {
  const name = 'selectedOption';

  return (
    <Formik
      initialValues={{
        selectedOption: ''
      }}
      onSubmit={() => {}}
    >
      {({ setFieldValue }) => (
        <Form>
          <FormControl component="fieldset" style={{ width: '100%' }}>
            <Typography variant="h6">1 . Selected Option</Typography>
            <RadioGroup
              name={name}
              onChange={(event) => {
                setFieldValue(name, event.currentTarget.value);
              }}
              style={{ width: '70%' }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                <FormControlLabel value="Option1" control={<Radio />} label="Option 1" />
                <FormControlLabel value="Option2" control={<Radio />} label="Option 2" />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                <FormControlLabel value="Option3" control={<Radio />} label="Option 3" />
                <FormControlLabel value="Option4" control={<Radio />} label="Option 4" />
              </Stack>
            </RadioGroup>
          </FormControl>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              disableElevation
              style={{ margin: 10 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default App;
