import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  TextField
} from '@material-ui/core';
import { addCSVQues } from '../../actions/test';

const QuestionForm = ({
  questions,
  setQuestion,
  id,
  handleNext,
  addCSVQues,
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
  const onNext = () => {
    setQuestion(questions);
    handleNext();
  };
  const addNewQuestions = (json) => {
    var newQues = [];
    json.map((ques) => {
      console.log(ques);
      let currentQues = {};
      if (
        ques.type &&
        ques.question &&
        ques.answer &&
        ques.option1 &&
        ques.option2 &&
        ques.option3 &&
        ques.option4
      ) {
        currentQues.type = ques.type;
        currentQues.question = ques.question;
        currentQues.answer = ques.answer;
        currentQues.option1 = ques.option1;
        currentQues.option2 = ques.option2;
        currentQues.option3 = ques.option3;
        currentQues.option4 = ques.option4;
        currentQues.test = id;
        newQues.push(currentQues);
      }
    });
    setQuestion(newQues.concat(questions));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    addCSVQues(data, addNewQuestions);
    console.log(value.quesFile);
    new Response(value.quesFile).json().then(
      (json) => {
        addNewQuestions(json);
      },
      (err) => {
        // not json
      }
    );
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
        <form
          onNext={handleSubmit}
          style={{ marginTop: 20, marginBottom: 15, height: 35 }}
        >
          <input
            type="file"
            name="quesFile"
            required
            id="quesFile"
            accept=".json,.csv"
          />
          <button type="submit">Submit</button>
        </form>
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
            <Button variant="contained" color="primary" onClick={onNext}>
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
  handleBack: PropTypes.func.isRequired,
  addCSVQues: PropTypes.func.isRequired
};

export default connect(null, {
  addCSVQues
})(QuestionForm);
