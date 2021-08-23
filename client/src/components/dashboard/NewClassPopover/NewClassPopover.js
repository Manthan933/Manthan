import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Button } from '@material-ui/core';

import MenuPopover from '../../MenuPopover';
import Create from './CreateClass';
import Join from './JoinClass';

export default function NewClassPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        ref={anchorRef}
        onClick={handleOpen}
        startIcon={<Icon icon={plusFill} />}
      >
        New Class
      </Button>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 150 }}
      >
        <Create Class />
        <Join Class />
      </MenuPopover>
    </>
  );
}
