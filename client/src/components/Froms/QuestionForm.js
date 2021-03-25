import React,{useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import axios from 'axios'
import { BASE_URL } from "../../constants/constants";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    top: "65px",
    left: "-8px",
  },
  msg: {
      color:"red",
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
  const handleRemoveClick = (index) => {
    const list = [...questions];
    list.pop();
    setErrMsg("");
    setQuestions(list);
  };
  const handleAddClick = () => {
    const ques = questions[questions.length - 1];
    if (ques.question && ques.option1 && ques.option2 && ques.option3 && ques.option4) {
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
          test : id
        },
      ]);
    } else {
      setErrMsg("Please provide question and all options");
    }
  };

 function addNewQuestions(json){
  var newQues = [];
  json.map((ques)=>{
    console.log(ques)
    let currentQues ={};
    if(ques.type && ques.question && ques.answer && ques.option1 &&
      ques.option2 && ques.option3 && ques.option4 ){
      currentQues.type = ques.type;
      currentQues.question = ques.question;
      currentQues.answer = ques.answer;
      currentQues.option1 = ques.option1;
      currentQues.option2 = ques.option2;
      currentQues.option3 = ques.option3;
      currentQues.option4 = ques.option4;
      currentQues.test = id
      newQues.push(currentQues)
    }

  })
  setQuestions(newQues.concat(questions));
 }

  const handleSubmit = (e) => {
    e.preventDefault();
      const data = new FormData(e.target);
         const value = Object.fromEntries(data.entries());
      axios.post(`${BASE_URL}/addQuestionFromCsv`,data)
        .then((res)=>{
          // console.log(res.data)
          addNewQuestions(res.data)
        })
        .catch(e=>{
          console.log(e);
        })
         console.log(value.quesFile)
      
          new Response(value.quesFile).json().then(json => {
              addNewQuestions(json);
            }, err => {
              // not json
            })
}
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Questions
      </Typography>
      <form onSubmit={handleSubmit} style={{marginTop:20,marginBottom:15,height:35}} >
            <input type="file" name="quesFile" required id="quesFile" accept=".json,.csv" />
            <button type="submit">Submit</button>

          </form>
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
            </React.Fragment>
          );
        })}
      </Grid>
      <p className={classes.msg}>{errMsg}</p>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={handleAddClick}
      >
        Add
      </Button>
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        onClick={handleRemoveClick}
      >
        Delete
      </Button>
    </React.Fragment>
  );
}
