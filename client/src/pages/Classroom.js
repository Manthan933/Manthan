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

function Classroom({ classroom: { currClass }, getClass }) {
  const { code } = parseURLParams(String(window.location));
  if (currClass === null) {
    getClass(code);
  }
  if (currClass)
    return (
      <Page>
        <Container>
          <Grid container spacing={3}>
            <ClassCard classroom={currClass} />
            {classes.map((curr, index) => (
              <TestCard key={curr.id} classroom={curr} index={index} />
            ))}
          </Grid>
        </Container>
      </Page>
    );
  return null;
}

Classroom.propTypes = {
  classroom: PropTypes.object.isRequired,
  getClass: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  classroom: state.classroom
});

export default connect(mapStateToProps, { getClass })(Classroom);
