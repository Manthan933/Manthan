import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';
// material
import { Stepper, Step, StepLabel, Stack, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import DetailsForm from '../components/createTest/DetailsForm';
import QuestionForm from '../components/createTest/QuestionForm';
import RulesForm from '../components/createTest/RulesFrom';
import Review from '../components/createTest/Review';
import { parseURLParams } from '../utils/parseUrlParams';
import { createTest } from '../actions/classroom';
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
  setRules,
  code,
  testId,
  setTestId
) {
  switch (stepIndex) {
    case 0:
      return (
        <DetailsForm
          handleBack={handleBack}
          handleNext={handleNext}
          setDetails={setDetails}
          code={code}
          setTestId={setTestId}
        />
      );
    case 1:
      return (
        <QuestionForm
          handleBack={handleBack}
          handleNext={handleNext}
          questions={questions}
          setQuestion={setQuestion}
          testId={testId}
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
function CreateTest({ createTest }) {
  const navigate = useNavigate();
  const { code } = parseURLParams(String(window.location));
  const [testId, setTestId] = useState(null);
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
    createTest(newTest);
    navigate(`/class/info?code=${code}`);
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
              setRules,
              code,
              testId,
              setTestId
            )}
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}

CreateTest.propTypes = {
  createTest: PropTypes.func.isRequired
};

export default connect(null, { createTest })(CreateTest);
