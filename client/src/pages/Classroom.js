import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// material
import { Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ClassCard, TestCard } from '../components/classroom';
import { parseURLParams } from '../utils/parseUrlParams';
import classes from '../_mocks_/blog';
import { getClass } from '../actions/classroom';

//

function Classroom({ classroom: { currClass }, auth: { user }, getClass }) {
  const { code } = parseURLParams(String(window.location));
  if (currClass === null) {
    getClass(code);
  }
  if (currClass) {
    const admin = currClass.author._id === user._id;

    return (
      <Page>
        <Container>
          <Grid container spacing={3}>
            <ClassCard classroom={currClass} admin={admin} />
            {classes.map((curr, index) => (
              <TestCard key={curr.id} classroom={curr} index={index} admin={admin} />
            ))}
          </Grid>
        </Container>
      </Page>
    );
  }
  return null;
}

Classroom.propTypes = {
  classroom: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getClass: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  classroom: state.classroom,
  auth: state.auth
});

export default connect(mapStateToProps, { getClass })(Classroom);
