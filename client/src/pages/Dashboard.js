import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// material
import { Grid, Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ClassCard, NewClassPopover } from '../components/dashboard';
//

function Dashboard({ auth: { classes } }) {
  return (
    <Page>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Classrooms
          </Typography>
          <NewClassPopover />
        </Stack>
        <Grid container spacing={3}>
          {classes.map((classroom, index) => (
            <ClassCard key={classroom._id} classroom={classroom} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
