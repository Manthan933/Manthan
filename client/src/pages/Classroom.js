import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// material
import { Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ClassCard, TestCard } from '../components/classroom';
import { parseURLParams } from '../utils/parseUrlParams';
import { getClass } from '../actions/classroom';

//

function Classroom({ classroom: { currClass, tests }, auth: { user }, getClass }) {
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
            {tests.map((curr, index) => (
              <TestCard key={curr._id} test={curr} index={index} admin={admin} email={user.email} />
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
