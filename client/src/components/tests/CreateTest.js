import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TestForm from './Testform';
import QuestionForm from './QuestionForm';
import RulesForm from './RulesForm';
import uuid from 'uuid/dist/v4';
import NotFound from '../layout/NotFound';
import { getClass } from '../../actions/classroom';
import { createTest } from '../../actions/test';
import { setAlert } from '../../actions/alert';
import { Container } from '@material-ui/core';

const id = uuid();
const CreateTest = ({
  getClass,
  classroom: { classroom },
  auth: { user },
  createTest,
  history,
  match
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [test, setTest] = useState({
    name: '',
    marks: 0,
    dueDate: new Date(),
    duration: new Date('January 1, 1970, 00:00:00 ')
  });
  const [questions, setQuestion] = useState([
    {
      question: '',
      type: 1,
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      test: id
    }
  ]);
  const [rules, setRules] = useState([{ type: 1, marks: 0, noofques: 0 }]);

  useEffect(() => {
    getClass(match.params.code);
  }, [getClass, match.params.code]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    const newTest = {
      id: id,
      test: test,
      classroom: classroom.code,
      questions: questions,
      rules: rules
    };
    console.log(newTest);
    createTest(classroom.code, history, newTest);
  };
  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <TestForm
            test={test}
            setTest={setTest}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <QuestionForm
            questions={questions}
            handleBack={handleBack}
            handleNext={handleNext}
            setQuestion={setQuestion}
            id={id}
          />
        );
      case 2:
        return (
          <RulesForm
            Rules={rules}
            setRule={setRules}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };
  if (classroom && user && user._id === classroom.admin._id) {
    return <Container>{getStepContent()}</Container>;
  }
  return <NotFound />;
};

CreateTest.propTypes = {
  getClass: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  createTest: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  classroom: state.classroom,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getClass,
  setAlert,
  createTest
})(withRouter(CreateTest));
