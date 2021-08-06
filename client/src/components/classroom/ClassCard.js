import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
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
const settings = {
  position: 'bottom-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};
ClassCard.propTypes = {
  classroom: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired
};

function ClassCard({ classroom, admin }) {
  const { cover, title, author, code, subject, subCode } = classroom;
  const onLinkClick = () => {
    const inputc = document.body.appendChild(document.createElement('input'));
    inputc.value = `${window.location.origin}/join/info?code=${code}`;
    inputc.focus();
    inputc.select();
    document.execCommand('copy');
    inputc.parentNode.removeChild(inputc);
    toast.success('Invite Link Copied', settings);
  };
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
            {admin ? <ClassCardPopover code={code} /> : null}
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
                onClick={onLinkClick}
                startIcon={<Icon icon={linkFill} />}
              >
                Invite Link
              </Button>
            </div>
            <InfoStyle>
              {admin ? (
                <Button
                  style={{ position: 'absolute', bottom: 0 }}
                  variant="contained"
                  startIcon={<Icon icon={plusFill} />}
                  href={`${window.location.origin}/test/create/info?code=${code}`}
                >
                  New Test
                </Button>
              ) : null}
            </InfoStyle>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default connect(null, { leaveClass })(ClassCard);
