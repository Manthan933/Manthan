import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Typography, Container } from '@material-ui/core';
import Table from './Table';
import { getScores } from '../../actions/test';
//import { setAlert } from '../../actions/alert';
import Spinner from '../layout/Spinner';
import NotFound from '../layout/NotFound';

const Scores = ({ match, getScores, test: { test, loading } }) => {
  React.useEffect(() => {
    getScores(match.params.id);
  }, [getScores, match.params.id]);

  if (loading) return <Spinner />;
  if (!test) {
    return <NotFound />;
  }
  return (
    <Container>
      <br />
      <br />
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Test : {test.details.name}
      </Typography>
      <Table scores={test.scores} />
    </Container>
  );
};

Scores.prototype = {
  getScores: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  test: state.test
});

export default connect(mapStateToProps, {
  getScores
  //setAlert
})(withRouter(Scores));
