import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Box
      component="img"
      src="https://i.ibb.co/PWZx4Zz/Method-Draw-Image-removebg-preview.png)
  "
      sx={{ width: 180, height: 90, ...sx }}
    />
  );
}
