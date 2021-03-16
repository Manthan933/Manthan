import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    top: "65px",
    left: "-8px",
  },
  msg: {
    color: "red",
  }
}));

export default function PaymentForm(props) {
  const classes = useStyles();
  const [errMsg, setErrMsg] = useState("");
  const { questions, setQuestions, id } = props;
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questions];
    list[index][name] = value;
    setQuestions(list);
  };
  const handleRemoveQuestionClick = (questionIndex) => {
    const list = [...questions];
    setErrMsg("");
    setQuestions(list.filter(
      (value, index) => index !== questionIndex
    ));
  };
  const handleAddQuestionClick = () => {
    const ques = questions[questions.length - 1];
    if ((questions.length === 0) || 
        (ques.question && ques.option1 &&
          ques.option2 && ques.option3 && 
          ques.option4 && ques.answer)) {
      setErrMsg("");
      setQuestions([
        ...questions,
        {
          question: "",
          type: 1,
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
          test: id
        },
      ]);
    } else {
      setErrMsg("Please provide question and all options");
    }
  };
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Questions
      </Typography>
      <Grid container spacing={3}>
        {questions.map((ques, index) => {
          return (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='question'
                  name='question'
                  value={ques.question}
                  label={`Question ${index + 1}`}
                  fullWidth
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='option1'
                  name='option1'
                  label='Option 1'
                  value={ques.option1}
                  fullWidth
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='option2'
                  name='option2'
                  label='Option 2'
                  value={ques.option2}
                  fullWidth
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='option3'
                  name='option3'
                  label='Option3'
                  value={ques.option3}
                  fullWidth
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id='option4'
                  name='option4'
                  label='Option4'
                  value={ques.option4}
                  fullWidth
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='type'
                  name='type'
                  label='Type'
                  type='number'
                  value={ques.type}
                  fullWidth
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='answer'
                  name='answer'
                  label='Answer'
                  value={ques.answer}
                  fullWidth
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handleRemoveQuestionClick(index)}
            >
              Delete
            </Button>
            </React.Fragment>
          );
        })}
      </Grid>
      <p className={classes.msg}>{errMsg}</p>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={handleAddQuestionClick}
      >
        Add
      </Button>
    </React.Fragment>
  );
}
