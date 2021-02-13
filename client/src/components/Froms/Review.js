import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const { name, marks, durationHrs, durationMins, dueDate, questions, rules } = props;
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6} md={9}>
          <Typography variant='h6' gutterBottom>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant='body2' gutterBottom>
            Max. Marks : {marks}
          </Typography>
        </Grid>
        <Grid item xs={6} md={9}>
          <Typography variant='body2' gutterBottom>
            {`Due : ${dueDate.toLocaleDateString()} `}
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant='body2' gutterBottom>
            {`Time : ${durationHrs} hrs ${durationMins} min`}
          </Typography>
        </Grid>
      </Grid>
      <div>
        <Typography variant='h6'>Questions</Typography>
        <List disablePadding>
          {questions.map((ques, index) => (
            <ListItem className={classes.listItem} key={index}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    primary={`${index + 1}. ${ques.question}`}
                    secondary={`Type : ${ques.type}`}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {ques.option1}
                </Grid>
                <Grid item xs={12} md={6}>
                  {ques.option2}
                </Grid>
                <Grid item xs={12} md={6}>
                  {ques.option3}
                </Grid>
                <Grid item xs={12} md={6}>
                  {ques.option4}
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        <Typography variant='h6'>Rules</Typography>
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align='right'>No of questions</TableCell>
                <TableCell align='right'>Marks per question</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rules.map((row) => (
                <TableRow key={row.type}>
                  <TableCell component='th' scope='row'>
                    {row.type}
                  </TableCell>
                  <TableCell align='right'>{row.noofques}</TableCell>
                  <TableCell align='right'>{row.marks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}
