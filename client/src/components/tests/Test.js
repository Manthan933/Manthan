import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { Radio } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Container
} from '@material-ui/core';
import NotFound from '../layout/NotFound';
import { startTest, submitTest } from '../../actions/test';
import Spinner from '../layout/Spinner';

const Test = ({
  startTest,
  submitTest,
  match,
  test: { test, loading },
  history
}) => {
  React.useEffect(() => {
    startTest(match.params.id);
  }, [startTest, match.params.id]);
  const onSubmit = (values) => {
    submitTest(match.params.id, history, values);
  };
  if (loading) return <Spinner />;
  if (!test) return <NotFound />;
  return (
    <Container>
      <br />
      <br />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        TEST
      </Typography>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <ol>
                    {test.map((Question, index) => {
                      return (
                        <li key={index}>
                          <Typography variant="h6" component="p">
                            {Question.question}
                          </Typography>
                          <FormControl component="fieldset">
                            <RadioGroup>
                              <FormControlLabel
                                label={Question.option1}
                                control={
                                  <Field
                                    name={`${Question._id}`}
                                    component={Radio}
                                    type="radio"
                                    value={Question.option1}
                                  />
                                }
                              />
                              <FormControlLabel
                                label={Question.option2}
                                control={
                                  <Field
                                    name={`${Question._id}`}
                                    component={Radio}
                                    type="radio"
                                    value={Question.option2}
                                  />
                                }
                              />
                              <FormControlLabel
                                label={Question.option3}
                                control={
                                  <Field
                                    name={`${Question._id}`}
                                    component={Radio}
                                    type="radio"
                                    value={Question.option3}
                                  />
                                }
                              />
                              <FormControlLabel
                                label={Question.option4}
                                control={
                                  <Field
                                    name={`${Question._id}`}
                                    component={Radio}
                                    type="radio"
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
                    variant="contained"
                    color="primary"
                    type="submit"
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
};

Test.propTypes = {
  test: PropTypes.object.isRequired,
  startTest: PropTypes.func.isRequired,
  submitTest: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  test: state.test
});

export default connect(mapStateToProps, { startTest, submitTest })(
  withRouter(Test)
);
