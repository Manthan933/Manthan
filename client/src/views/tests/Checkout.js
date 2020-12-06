import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    top:"65px",
    left:"-8px",
  },
}));


export default function PaymentForm(props) {
  const classes = useStyles();
  const {rules, setRules} = props;

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...rules];
    list[index][name] = value;
    setRules(list);
  };

  const handleAddClick = ()=>{}
  const handleRemoveClick = ()=> {}
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Rules
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id='Type'
            label='Type'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id='questions'
            label='No of questions'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id='marks'
            label='Marks of a question'
            fullWidth
          />
        </Grid>   
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
