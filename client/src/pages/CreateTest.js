import { useState } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// material
import { Stepper, Step, StepLabel, Stack, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import TestForm from '../components/createTest/TestForm';
import QuestionForm from '../components/createTest/QuestionForm';
import RulesForm from '../components/createTest/RulesFrom';
import Review from '../components/createTest/Review';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

function getSteps() {
  return ['Details', 'Questions', 'Rules', 'Review'];
}
function getStepContent(
  stepIndex,
  handleNext,
  handleBack,
  handleSubmit,
  details,
  setDetails,
  questions,
  setQuestion,
  rules,
  setRules
) {
  switch (stepIndex) {
    case 0:
      return <TestForm handleBack={handleBack} handleNext={handleNext} setDetails={setDetails} />;
    case 1:
      return (
        <QuestionForm
          handleBack={handleBack}
          handleNext={handleNext}
          questions={questions}
          setQuestion={setQuestion}
        />
      );
    case 2:
      return (
        <RulesForm
          handleBack={handleBack}
          handleNext={handleNext}
          rules={rules}
          setRules={setRules}
        />
      );
    case 3:
      return (
        <Review
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          details={details}
          questions={questions}
          rules={rules}
        />
      );
    default:
      return 'Unknown stepIndex';
  }
}
export default function CreateTest() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [details, setDetails] = useState(null);
  const [questions, setQuestion] = useState([]);
  const [rules, setRules] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    const newTest = { details, questions, rules };
    console.log(newTest);
  };

  return (
    <Page>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Test
          </Typography>
        </Stack>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <ContentStyle>
          <Typography style={{ margin: 5 }}>
            {getStepContent(
              activeStep,
              handleNext,
              handleBack,
              handleSubmit,
              details,
              setDetails,
              questions,
              setQuestion,
              rules,
              setRules
            )}
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
