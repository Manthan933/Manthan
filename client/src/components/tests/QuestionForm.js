import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  TextField
} from '@material-ui/core';

const QuestionForm = ({
  questions,
  setQuestion,
  id,
  handleNext,
  handleBack
}) => {
  const ques = {
    question: '',
    type: 1,
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    test: id
  };
  const AddQuestion = () => {
    setQuestion([...questions, ques]);
  };
  const RemoveQuestion = (index) => {
    const list = [...questions];
    setQuestion(list.filter((value, i) => i !== index));
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questions];
    list[index][name] = value;
    setQuestion(list);
  };
  const onSubmit = () => {
    setQuestion(questions);
    handleNext();
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Create Test
      </Typography>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Questions Form
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Grid container alignItems="flex-start" spacing={2}>
          {questions
            ? questions.map((curr, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="question"
                        name="question"
                        value={curr.question}
                        label={`Question ${index + 1}`}
                        fullWidth
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="option1"
                        name="option1"
                        label="Option 1"
                        value={curr.option1}
                        fullWidth
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="option2"
                        name="option2"
                        label="Option 2"
                        value={curr.option2}
                        fullWidth
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="option3"
                        name="option3"
                        label="Option3"
                        value={curr.option3}
                        fullWidth
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        id="option4"
                        name="option4"
                        label="Option4"
                        value={curr.option4}
                        fullWidth
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="answer"
                        name="answer"
                        label="Answer"
                        value={curr.answer}
                        fullWidth
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="type"
                        name="type"
                        label="Type"
                        type="number"
                        value={curr.type}
                        fullWidth
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: 16 }}>
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={() => RemoveQuestion(index)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </React.Fragment>
                );
              })
            : null}
          <Grid item xs={12} style={{ marginTop: 16 }}>
            <Button
              type="button"
              variant="contained"
              color="sucess"
              onClick={AddQuestion}
            >
              Add new question
            </Button>
          </Grid>
          <Grid item style={{ marginTop: 16 }}>
            <Button type="button" variant="contained" onClick={handleBack}>
              Back
            </Button>
          </Grid>
          <Grid item style={{ marginTop: 16 }}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Next
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

QuestionForm.propTypes = {
  questions: PropTypes.array.isRequired,
  setQuestion: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default QuestionForm;
