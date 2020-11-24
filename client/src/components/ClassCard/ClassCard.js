import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
 
import image from '../../assets/images/5.jpg';

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: 300,
    minHeight: 220,
    maxHeight: 220,
    minWidth:300,
    margin: theme.spacing(2),
    borderRadius: '5px',
    background: 'linear-gradient(225deg, #e6e6e6, #ffffff)',
    boxShadow:  '-5px 5px 10px #b3b3b3, 5px -5px 10px #ffffff',
  },
  title: {
    fontWeight:"bold",
    color:"white",
  },
  pos: {  
    paddingTop:theme.spacing(2),
    color:"white",
  },
  body:{
    backgroundImage: `url(`+image+`)`,
    backgroundColor:"#00000070",
    backgroundBlendMode:"darken",   
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

export default function SimpleCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
          <div className={classes.body}>
            <Typography className={classes.title} variant="h5" component="a" href={`/${props.Class._id}`} gutterBottom color="textPrimary">
            {props.Class.name}
            </Typography>
          
        <Typography className={classes.pos} color="textSecondary">
          {props.Class.instructor}
        </Typography></div>
        <Avatar className={classes.avatar} src={props.Class.image}/>
        <div className={classes.details}>
        <Typography variant="body1" component="p">
          Subject: {props.Class.subject}
        </Typography>
        <Typography variant="body1" component="p">
          Subject Code: {props.Class.subcode}
        </Typography>
        <Typography variant="body1" component="p">
          Class Code: {props.Class.code}
        </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
