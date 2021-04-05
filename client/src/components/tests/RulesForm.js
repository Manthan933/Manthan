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

const RuleForm = ({ Rules, setRule, handleSubmit, handleBack }) => {
  const rule = { type: 1, marks: 0, noofques: 0 };

  const AddRule = () => {
    setRule([...Rules, rule]);
  };
  const RemoveRule = (index) => {
    const list = [...Rules];
    setRule(list.filter((value, i) => i !== index));
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...Rules];
    list[index][name] = value;
    setRule(list);
  };
  const onSubmit = () => {
    setRule(Rules);
    handleSubmit();
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography style={{ color: "white" }} variant="h4" align="center" component="h1" gutterBottom>
        Create Test
      </Typography>
      <Typography style={{ color: "white" }} variant="h5" align="center" component="h2" gutterBottom>
        Rules Form
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Grid container alignItems="flex-start" spacing={2}>
          {Rules
            ? Rules.map((curr, index) => {
              return (
                <React.Fragment key={index}>
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
                  <Grid item xs={3}>
                    <TextField
                      id="noofques"
                      name="noofques"
                      label="Number of Ques"
                      type="number"
                      value={curr.noofques}
                      fullWidth
                      onChange={(e) => handleChange(e, index)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="marks"
                      name="marks"
                      label="Marks per Ques"
                      type="number"
                      value={curr.marks}
                      fullWidth
                      onChange={(e) => handleChange(e, index)}
                    />
                  </Grid>
                  <Grid item xs={3} style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() => RemoveRule(index)}
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
              onClick={AddRule}
            >
              Add Rule
            </Button>
          </Grid>
          <Grid item style={{ marginTop: 16 }}>
            <Button type="button" variant="contained" onClick={handleBack}>
              Back
            </Button>
          </Grid>
          <Grid item style={{ marginTop: 16 }}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

RuleForm.propType = {
  Rules: PropTypes.object.isRequired,
  setRule: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default RuleForm;
