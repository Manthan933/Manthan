import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';

import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { useNavigate } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Box, MenuItem, IconButton } from '@material-ui/core';
// components
import MenuPopover from '../MenuPopover';
import { leaveClass } from '../../actions/user';
import EditClass from './EditClass';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function ClassCardPopover({ leaveClass, code }) {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const leave = () => {
    leaveClass(code);
    navigate('/dashboard');
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Icon icon={moreVerticalFill} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <EditClass code={code} />
        <MenuItem onClick={leave} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
          <Box
            component={Icon}
            icon={trash2Fill}
            sx={{
              mr: 2,
              width: 24,
              height: 24
            }}
          />
          Delete Classroom
        </MenuItem>
      </MenuPopover>
    </>
  );
}

ClassCardPopover.propTypes = {
  leaveClass: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired
};

export default connect(null, { leaveClass })(ClassCardPopover);
