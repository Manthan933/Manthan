import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import linkFill from '@iconify/icons-eva/link-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Card, Grid, Avatar, Typography, CardContent } from '@material-ui/core';
import SvgIconStyle from '../SvgIconStyle';
import { mockImgCover } from '../../utils/mockImages';
import { leaveClass } from '../../actions/user';
import ClassCardPopover from './ClassCardPopover';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: '60px'
});

const TitleStyle = styled(Typography)({
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
  position: 'relative',
  width: '118px'
});

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ClassCard.propTypes = {
  classroom: PropTypes.object.isRequired
};

function ClassCard({ classroom }) {
  const { cover, title, author, code, subject, subCode } = classroom;
  console.log(cover);
  return (
    <Grid item md={12} xs={12}>
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

          <CoverImgStyle alt={title} src={cover != null ? cover : mockImgCover(1 % 24)} />
        </CardMediaStyle>
        <CardContent>
          <div style={{ display: 'flex' }}>
            <TitleStyle style={{ flex: 'auto' }} color="inherit" variant="h4">
              {title}
            </TitleStyle>
            <ClassCardPopover />
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 'auto' }}>
              <Typography color="inherit" variant="subtitle2" underline="hover">
                {`Subject : ${subject}`}
              </Typography>
              <Typography color="inherit" variant="subtitle2" underline="hover">
                {`Subject Code : ${subCode}`}
              </Typography>
              <Typography color="inherit" variant="subtitle2" underline="hover">
                {`Class Code : ${code}`}
              </Typography>
              <Button
                variant="contained"
                style={{ width: 130 }}
                startIcon={<Icon icon={linkFill} />}
              >
                Invite Link
              </Button>
            </div>
            <InfoStyle>
              <Button
                style={{ position: 'absolute', bottom: 0 }}
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
              >
                New Test
              </Button>
            </InfoStyle>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default connect(null, { leaveClass })(ClassCard);
