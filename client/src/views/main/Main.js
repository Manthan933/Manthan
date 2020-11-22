import React, { Component } from 'react';
import Container from '@material-ui/core/Container';


import FloatingButton from '../../components/FloatingButton/FloatingButton';
import axios from 'axios';

class Main extends Component {

  render() {
    return (
      <Container>
           <FloatingButton text="Add Classroom"/>
      </Container>
    );
  }
}

export default Main;