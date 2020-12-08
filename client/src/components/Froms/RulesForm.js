import React from "react";
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
}));

export default function PaymentForm(props) {
  const classes = useStyles();
  const { rules, setRules } = props;
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...rules];
    list[index][name] = value;
    setRules(list);
  };
  const handleRemoveClick = (index) => {
    const list = [...rules];
    list.pop();
    setRules(list);
  };
  const handleAddClick = () => {
    setRules([
      ...rules,
      {
        type: 1,
        noofques: 0,
        marks: 0,
      },
    ]);
  };
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Rules
      </Typography>
      <Grid container spacing={3}>
        {rules.map((rule, index) => {
          return (
            <React.Fragment key = {index}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='type'
                  name='type'
                  value={rule.type}
                  label={`Type`}
                  fullWidth
                  type='number'
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='noofques'
                  name='noofques'
                  value={rule.noofques}
                  label='No of questions'
                  type='number'
                  fullWidth
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='marks'
                  name='marks'
                  value={rule.marks}
                  label='Marks of a question'
                  fullWidth
                  type='number'
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
            </ React.Fragment>
          );
        })}
      </Grid>
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
