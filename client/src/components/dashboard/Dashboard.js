import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Container } from '@material-ui/core';
import FloatingButton from './ClassButton';
import ClassCard from './ClassCard';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4)
  },
  noClass: {
    backgroundImage: 'url(https://www.gstatic.com/classroom/documents_floating_into_folder.png)',
    position: 'relative',
    height: '450px',
    width: '370px',
    textAlign: 'center',
    backgroundRepeat: 'no-repeat',
    margin: 'auto'
  },
  text: {
    position: 'absolute',
    bottom: '0px'
  },
  textSet: {
    marginLeft: '45px'
  },
  classContainer: {
    justifyContent: 'center',
    margin: '0 auto',
    width: '100%'
  },
  '@media screen and (min-width: 32em)': {
    classContainer: {
      justifyContent: 'left',
      paddingLeft: '30px',
      paddingRight: '30px'
    }
  }
}));

const Dashboard = ({ classroom: { classrooms, loading } }) => {
  const classes = useStyles();
  if (loading) return <Spinner />;
  return (
    <Container className={classes.root}>
      {classrooms.length ? (
        <Grid container className={classes.classContainer} spacing={5}>
          {classrooms.map((classroom) => {
            return <ClassCard key={classroom.code} Class={classroom} />;
          })}
        </Grid>
      ) : (
        <Grid container justify="center" spacing={5} style={{ minHeight: '85vh' }}>
          <div className={classes.noClass}>
            <footer className={classes.text}>
              <Typography variant="h4" className={classes.textSet}>
                No classes here!
              </Typography>
              <Typography variant="subtitle1" className={classes.textSet}>
                Create a new class or join class.
              </Typography>
            </footer>
          </div>
        </Grid>
      )}

      <FloatingButton text="Add Classroom" />
    </Container>
  );
};

Dashboard.propTypes = {
  classroom: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  classroom: state.classroom
});

export default connect(mapStateToProps)(Dashboard);
