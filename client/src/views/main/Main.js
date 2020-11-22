import React, { Component } from 'react';
import Container from '@material-ui/core/Container';


import { makeStyles } from '@material-ui/core/styles';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import ClassCard from '../../components/ClassCard/ClassCard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
}));
export default function SpacingGrid(){
  const classes = useStyles();

    return (
      <div>
      <Container className={classes.root}>
        <Grid container justify= "center" spacing={5}>
        <ClassCard/>
        <ClassCard/>  
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        <ClassCard/>
        </Grid>
      <FloatingButton text="Add Classroom"/>
        
      </Container>
      
      </div>
    );
}
