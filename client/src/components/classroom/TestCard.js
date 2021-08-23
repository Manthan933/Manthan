import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { connect } from 'react-redux';
import leaveFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Grid, Button, IconButton, Typography, CardContent } from '@material-ui/core';
import { deleteTest } from '../../actions/classroom';
import { getTest } from '../../actions/test';

// ----------------------------------------------------------------------

const TitleStyle = styled(Typography)({
  height: 30,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const InfoStyle = styled('div')({
  display: 'block',
  position: 'relative'
});

// ----------------------------------------------------------------------

TestCard.propTypes = {
  test: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  deleteTest: PropTypes.func.isRequired,
  getTest: PropTypes.func.isRequired
};

function TestCard({ test, admin, email, deleteTest, getTest }) {
  const navigate = useNavigate();
  const { name, marks, duration, scores, _id } = test;
  const dueDate = new Date(test.dueDate);
  const attempted = scores.filter((e) => e.email === email);
  console.log(attempted);

  const getUserButton = () => {
    if (attempted.length > 0)
      return <Button variant="contained">{`Marks : ${attempted[0].marks}`}</Button>;

    return (
      <Button href={`/test/info?test=${_id}`} disableElevation variant="contained">
        Start Test
      </Button>
    );
  };

  const handleClick = () => {
    getTest(_id);
    navigate(`/class/score/info?test=${_id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 'auto' }}>
              <TitleStyle color="inherit" variant="h5" underline="hover">
                {name}
              </TitleStyle>
              <Typography color="inherit" variant="subtitle2" underline="hover">
                {`Marks : ${marks}`}
              </Typography>
              <Typography color="inherit" variant="subtitle2" underline="hover">
                {`Duration : ${duration.hrs} hrs ${duration.min} min`}
              </Typography>
              <Typography color="inherit" variant="subtitle2" underline="hover">
                {`Due Date : ${dueDate.toLocaleDateString()}`}
              </Typography>
            </div>
            <InfoStyle>
              {admin ? (
                <>
                  <IconButton
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    color="error"
                    onClick={() => deleteTest(_id)}
                  >
                    <Icon icon={leaveFill} />
                  </IconButton>
                  <Button
                    style={{ position: 'absolute', bottom: 0, right: 0, width: 'max-content' }}
                    onClick={handleClick}
                    disableElevation
                    variant="contained"
                  >
                    Check Scores
                  </Button>
                </>
              ) : (
                getUserButton()
              )}
            </InfoStyle>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default connect(null, { deleteTest, getTest })(TestCard);
