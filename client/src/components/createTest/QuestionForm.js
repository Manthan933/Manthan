import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import plusFill from '@iconify/icons-eva/plus-fill';
import trashFill from '@iconify/icons-eva/trash-2-fill';
// material
import { Stack, TextField, IconButton, Button } from '@material-ui/core';

// ----------------------------------------------------------------------

function QuestionForm({ handleBack, handleNext, questions, setQuestion, testId }) {
  const ques = {
    question: '',
    type: 1,
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    testId
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

  return (
    <Stack spacing={3}>
      {questions.map((curr, index) => (
        <Stack key={index} spacing={2}>
          <TextField
            required
            id="question"
            name="question"
            value={curr.question}
            label={`Question ${index + 1}`}
            fullWidth
            onChange={(e) => handleChange(e, index)}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              id="option1"
              name="option1"
              label="Option 1"
              value={curr.option1}
              fullWidth
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              required
              id="option2"
              name="option2"
              label="Option 2"
              value={curr.option2}
              fullWidth
              onChange={(e) => handleChange(e, index)}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              id="option3"
              name="option3"
              label="Option3"
              value={curr.option3}
              fullWidth
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              required
              id="option4"
              name="option4"
              label="Option4"
              value={curr.option4}
              fullWidth
              onChange={(e) => handleChange(e, index)}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id="answer"
              name="answer"
              label="Answer"
              value={curr.answer}
              fullWidth
              required
              onChange={(e) => handleChange(e, index)}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                id="type"
                name="type"
                label="Type"
                type="number"
                value={curr.type}
                onChange={(e) => handleChange(e, index)}
              />

              <IconButton onClick={() => RemoveQuestion(index)} color="error">
                <Icon icon={trashFill} />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      ))}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={AddQuestion}
          startIcon={<Icon icon={plusFill} />}
        >
          Add new question
        </Button>
      </Stack>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0 }}>
          <Button color="primary" style={{ margin: 5 }} onClick={handleBack}>
            Back
          </Button>
          <Button
            disableElevation
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </Stack>
  );
}

QuestionForm.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  setQuestion: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  testId: PropTypes.string.isRequired
};

export default QuestionForm;
