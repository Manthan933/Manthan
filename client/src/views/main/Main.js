import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from '../../components/Navbar/Navbar';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import ClassCard from '../../components/ClassCard/ClassCard';

import {getClasses} from '../../actions/actions'; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
}));
export default function SpacingGrid(){
  const classes = useStyles();
  const [user, setUser] = React.useState({});
  const [Classes, setClasses] = React.useState([]);
  getClasses(user._id,setClasses);
  return (
    <div>
    <Navbar user={user} setUser={setUser}/>
    <Container className={classes.root}>
      <Grid container justify= "center" spacing={5}>
        {
          Classes.map((Class)=>{
            return(
            <ClassCard key={Class._id} Class={Class} admin={user._id===Class.instructor? true:false}/>
            );
          })
        }
      </Grid>
    <FloatingButton text="Add Classroom"/>
      
    </Container>
    
    </div>
  );
}
