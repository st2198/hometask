import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './index.css'

type Option = {
    text: string,
    handler: (id: number) => void
};

type MenuMoreProp = {
    activityId: number,
    options: Option[]
};
export default function MenuMore({options, activityId}: MenuMoreProp) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='MenuMore-root'>
      <IconButton
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option.text} onClick={() => {
            option.handler(activityId);
            handleClose();
          }}>
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}