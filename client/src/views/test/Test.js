import React from "react";
import { Form, Field } from "react-final-form";
import { Radio } from "final-form-material-ui";
import {
  Typography,
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import { startTest, submitTest } from "../../actions/actions";

export default function App(props) {
  const { test_id } = props.match.params;
  const [Test, setTest] = React.useState([]);
  React.useEffect(() => {
    startTest(test_id, setTest);
  }, [test_id]);
  const onSubmit = (values) => {
    let score = {};
    Test.forEach((Question) => {
      if (isNaN(score[Question.type])) score[Question.type] = 0;
      if (Question.answer === values[`Question${Question.question}`])
        score[Question.type] = score[Question.type] + 1;
    });
    submitTest(test_id, score, props.user);
    window.location.replace(`/`);
  };
  return (
    <Container>
      <br />
      <br />
      <Typography variant='h5' align='center' component='h2' gutterBottom>
        TEST
      </Typography>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems='flex-start' spacing={2}>
                <Grid item xs={12}>
                  <ol>
                    {Test.map((Question, index) => {
                      return (
                        <li key={index}>
                          <Typography variant='h6' component='p'>
                            {Question.question}
                          </Typography>
                          <FormControl component='fieldset'>
                            <RadioGroup>
                              <FormControlLabel
                                label={Question.option1}
                                control={
                                  <Field
                                    name={`Question${Question.question}`}
                                    component={Radio}
                                    type='radio'
                                    value={Question.option1}
                                  />
                                }
                              />
                              <FormControlLabel
                                label={Question.option2}
                                control={
                                  <Field
                                    name={`Question${Question.question}`}
                                    component={Radio}
                                    type='radio'
                                    value={Question.option2}
                                  />
                                }
                              />
                              <FormControlLabel
                                label={Question.option3}
                                control={
                                  <Field
                                    name={`Question${Question.question}`}
                                    component={Radio}
                                    type='radio'
                                    value={Question.option3}
                                  />
                                }
                              />
                              <FormControlLabel
                                label={Question.option4}
                                control={
                                  <Field
                                    name={`Question${Question.question}`}
                                    component={Radio}
                                    type='radio'
                                    value={Question.option4}
                                  />
                                }
                              />
                            </RadioGroup>
                          </FormControl>
                        </li>
                      );
                    })}
                  </ol>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type='button'
                    variant='contained'
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </Container>
  );
}
