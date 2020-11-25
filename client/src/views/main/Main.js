import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from '../../components/Navbar/Navbar';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import ClassCard from '../../components/ClassCard/ClassCard';
import {getClasses, createClass, joinClass} from '../../actions/actions'; 
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root:{
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  noClass:{
    backgroundImage:'url(https://www.gstatic.com/classroom/documents_floating_into_folder.png)',
    position:"absolute",
    height: '450px',
    width: '370px',
    textAlign: 'center',
    backgroundRepeat: 'no-repeat',
    marginTop: '10%',
  },
  text:{
    position: 'absolute',
    bottom: '0px',
    left: '24%',
  },
  classContainer:{
    justifyContent:"center",
  },
  '@media screen and (min-width: 32em)': {
    classContainer:{
      justifyContent:"left",
      paddingLeft:"30px",
      paddingRight:"30px",
    },
  }
}));

export default function SpacingGrid(){
  const classes = useStyles();
  const [user, setUser] = React.useState({});
  const [Classes, setClasses] = React.useState([]);
  React.useEffect(() => {getClasses(user._id,setClasses)}, [user])

  const CreateClass = (newClass) =>{
    createClass(newClass,user, Classes, setClasses)
  }
  const JoinClass = (classCode) => {
    joinClass(user, Classes, setClasses, classCode);
  }

  return (
    <div>
    <Navbar user={user} setUser={setUser} Classes = {Classes} setClasses={setClasses}/>
    <Container className={classes.root}>
      {Classes.length? 
      <Grid container className={classes.classContainer} spacing={5}>
        {Classes.map((Class,key)=>{
          return(<ClassCard key={key} Class={Class} admin={user._id===Class.instructor? true:false}/>);
        })}
      </Grid>:
      <Grid container justify="center" spacing={5}>
      <div className={classes.noClass}>
        <footer className={classes.text}>
        <Typography  variant="h6" color="textSecondary">No classes here!</Typography>
        <Typography  variant="subtitle1" color="textPrimary">Create a new class or join class.</Typography>
        </footer>
      </div>
      </Grid>}
      <FloatingButton text="Add Classroom" JoinClass = {JoinClass} CreateClass={CreateClass} />
    </Container>    
    </div>
  );
}
