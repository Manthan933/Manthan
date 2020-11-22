import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: 275,
    minWidth:275,
    margin: theme.spacing(2),
  },
  title: {
    fontWeight:"bold",
    color:"white",
  },
  pos: {
    marginTop:theme.spacing(2),
    fontSize:"small",
    color:"white",
  },
  body:{
      backgroundColor: "grey",
      padding:theme.spacing(3),
      paddingBottom:0,
      
  },
  content:{
      padding:0,
      position:'relative',
  },
  details:{
    padding:theme.spacing(2),
  },
  avatar:{
    position:"absolute",
    top:theme.spacing(7),
    height: theme.spacing(10),
    width:theme.spacing(10),
    right: theme.spacing(2),
  }
}));

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
          <div className={classes.body}>
            <Typography className={classes.title} variant="h5" component="a" href="/" gutterBottom color="textPrimary">
            Word of the Daya
            </Typography>
          
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography></div>
        <Avatar className={classes.avatar}/>
        <div className={classes.details}>
        <Typography variant="body2" component="p">
          Subject: sadjf;
        </Typography>
        <Typography variant="body2" component="p">
          Code: salkj;d
        </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
