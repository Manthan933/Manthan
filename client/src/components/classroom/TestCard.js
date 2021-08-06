import PropTypes from 'prop-types';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Grid, Button, Typography, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const TitleStyle = styled(Typography)({
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

TestCard.propTypes = {
  classroom: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired
};

function TestCard({ classroom, admin }) {
  const { title, subject } = classroom;

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <TitleStyle color="inherit" variant="h5" underline="hover">
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
              {admin ? (
                <Button href="/scores/info?test=test" disableElevation variant="contained">
                  Check Scores
                </Button>
              ) : (
                <Button href="/test/info?test=test" disableElevation variant="contained">
                  Start Test
                </Button>
              )}
            </InfoStyle>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default TestCard;
