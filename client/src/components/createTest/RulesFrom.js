import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import plusFill from '@iconify/icons-eva/plus-fill';
import trashFill from '@iconify/icons-eva/trash-2-fill';
// material
import { Stack, TextField, IconButton, Button } from '@material-ui/core';

// ----------------------------------------------------------------------

function RulesForm({ handleBack, handleNext, rules, setRules }) {
  const rule = {
    noofques: '',
    marks: ''
  };

  const AddRules = () => {
    setRules([...rules, { ...rule, type: rules.length + 1 }]);
  };
  const RemoveRule = (index) => {
    const list = [...rules];
    setRules(list.filter((value, i) => i !== index));
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...rules];
    list[index][name] = value;
    setRules(list);
  };

  return (
    <Stack spacing={3}>
      {rules.map((curr, index) => (
        <Stack key={index} spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              id="type"
              name="type"
              label="Type"
              value={curr.type}
              fullWidth
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              required
              id="noofques"
              name="noofques"
              label="No of Questions"
              value={curr.noofques}
              fullWidth
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              id="marks"
              name="marks"
              label="Marks"
              value={curr.marks}
              fullWidth
              required
              onChange={(e) => handleChange(e, index)}
            />

            <IconButton onClick={() => RemoveRule(index)} color="error">
              <Icon icon={trashFill} />
            </IconButton>
          </Stack>
        </Stack>
      ))}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={AddRules}
          startIcon={<Icon icon={plusFill} />}
        >
          Add New Rule
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

RulesForm.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  setRules: PropTypes.func.isRequired,
  rules: PropTypes.array.isRequired
};

export default RulesForm;
