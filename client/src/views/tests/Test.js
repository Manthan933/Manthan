import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Rules from "./Checkout";
import Review from "./Review";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Test details", "Questions", "Rules", "Review"];

function getStepContent(
  step,
  name,
  marks,
  duration,
  dueDate,
  questions,
  rules,
  setName,
  setMarks,
  setDuration,
  setDueDate,
  setQuestions,
  setRules
) {
  switch (step) {
    case 0:
      return (
        <AddressForm
          name={name}
          setName={setName}
          marks={marks}
          setMarks={setMarks}
          duration={duration}
          setDuration={setDuration}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />
      );
    case 1:
      return <PaymentForm questions={questions} setQuestions={setQuestions} />;
    case 2:
      return <Rules rules={rules} setRules={setRules} />;
    case 3:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = React.useState("");
  const [dueDate, setDueDate] = React.useState(Date());
  const [duration, setDuration] = React.useState(Date());
  const [marks, setMarks] = React.useState("");
  const [questions, setQuestions] = React.useState([
    {
      question: "",
      type: 1,
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    },
  ]);
  const [rules, setRules] = React.useState([
    { type: 1, marks: "", noofques: "" },
  ]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Create Test
          </Typography>

          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant='h5' gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant='subtitle1'>
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  name,
                  marks,
                  duration,
                  dueDate,
                  questions,
                  rules,
                  setName,
                  setMarks,
                  setDuration,
                  setDueDate, 
                  setQuestions,
                  setRules
                )}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
