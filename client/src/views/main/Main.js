import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from '../../components/Navbar/Navbar';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import ClassCard from '../../components/ClassCard/ClassCard';
import {getClasses, createClass, joinClass} from '../../actions/actions'; 

const useStyles = makeStyles((theme) => ({
  root:{
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
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
    joinClass(user, setClasses, Classes, setClasses, classCode);
    console.log(Classes);
  }

  return (
    <div>
    <Navbar user={user} setUser={setUser} Classes = {Classes} setClasses={setClasses}/>
    <Container className={classes.root}>
      <Grid container justify= "center" spacing={5}>
        {console.log(Classes)}
        {Classes.map((Class,key)=>{
          return(<ClassCard key={key} Class={Class} admin={user._id===Class.instructor? true:false}/>);
        })}
      </Grid>
      <FloatingButton text="Add Classroom" JoinClass = {JoinClass} CreateClass={CreateClass} />
    </Container>    
    </div>
  );
}
