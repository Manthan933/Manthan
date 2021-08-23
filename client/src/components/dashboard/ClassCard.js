import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';

import leaveFill from '@iconify/icons-eva/trash-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { IconButton, Link, Card, Grid, Avatar, Typography, CardContent } from '@material-ui/core';
import SvgIconStyle from '../SvgIconStyle';
import { mockImgCover } from '../../utils/mockImages';
import { leaveClass } from '../../actions/user';
import { getClass } from '../../actions/classroom';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 2 / 5)'
});

const TitleStyle = styled(Link)({
  height: 30,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end'
});

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

function ClassCard({ classroom, index, leaveClass, getClass }) {
  const { cover, title, author, code, subject } = classroom;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute'
            }}
          />
          <AvatarStyle alt={author.name} src={author.avatarURL} />
          <CoverImgStyle alt={title} src={cover != null ? cover : mockImgCover((index + 1) % 24)} />
        </CardMediaStyle>
        <CardContent>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {author.name}
          </Typography>

          <TitleStyle
            onClick={() => getClass(code)}
            to={`/class/info?code=${classroom.code}`}
            color="inherit"
            variant="subtitle2"
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
              <IconButton onClick={() => leaveClass(code)} color="error">
                <Icon icon={leaveFill} />
              </IconButton>
            </InfoStyle>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

ClassCard.propTypes = {
  classroom: PropTypes.object.isRequired,
  leaveClass: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  getClass: PropTypes.func.isRequired
};

export default connect(null, { leaveClass, getClass })(ClassCard);
