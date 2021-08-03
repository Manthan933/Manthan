import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';

import leaveFill from '@iconify/icons-eva/trash-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { IconButton, Link, Card, Grid, Button, Typography, CardContent } from '@material-ui/core';
import { leaveClass } from '../../actions/user';

// ----------------------------------------------------------------------

const TitleStyle = styled(Link)({
  height: 30,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const InfoStyle = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end'
});

// ----------------------------------------------------------------------

ClassCard.propTypes = {
  classroom: PropTypes.object.isRequired,
  leaveClass: PropTypes.func.isRequired
};

function ClassCard({ classroom, leaveClass }) {
  const { title, code, subject } = classroom;

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <TitleStyle
            to={`/classroom/${code}`}
            color="inherit"
            variant="h5"
            underline="hover"
            component={RouterLink}
          >
            {title}
          </TitleStyle>
          <div style={{ display: 'flex' }}>
            <Typography
              style={{ flex: 'auto' }}
              color="inherit"
              variant="subtitle2"
              underline="hover"
            >
              {subject !== '' ? `Subject : ${subject}` : ' '}
            </Typography>
            <InfoStyle>
              {true ? (
                <Button disableElevation variant="contained">
                  Start Test
                </Button>
              ) : (
                <IconButton onClick={() => leaveClass(code)} color="error">
                  <Icon icon={leaveFill} />
                </IconButton>
              )}
            </InfoStyle>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default connect(null, { leaveClass })(ClassCard);
