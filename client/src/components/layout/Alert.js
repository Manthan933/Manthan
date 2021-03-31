import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

const Alert = ({ alerts }) => {
  return (
    <Fragment>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={true}
          autoHideDuration={6000}
          message={alert.msg}
        />
      ))}
    </Fragment>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
