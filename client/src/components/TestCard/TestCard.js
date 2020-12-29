import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ClassIcon from "@material-ui/icons/Class";
import { Avatar} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    margin: 20,
  },

  content: {
    display: "inline-flex",
    width: "-moz-available",
  },
  details: {
    flexGrow: " 1",
    marginInlineStart: "1.5%",
  },
  avatar: {
    background: "#4285f4",
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const { name, dueDate } = props.Test;
  const date = new Date(dueDate);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Avatar className={classes.avatar}>
          <ClassIcon />
        </Avatar>
        <div className={classes.details}>
          <Typography variant='h6'>{name}</Typography>
          <Typography variant='subtitle2' color='textSecondary'>
           Due : {date.toLocaleDateString()} 
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
