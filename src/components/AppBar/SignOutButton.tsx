import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AccountCircle } from '@material-ui/icons';
import { useState } from 'react';

import { useMsal } from '../../context/AuthProvider';
import AccountPicker from './AccountPicker';

export default function SignOutButton() {
  const { instance } = useMsal();
  const [accountSelectorOpen, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = logoutType => {
    setAnchorEl(null);

    if (logoutType === 'popup') {
      instance.logoutPopup();
    } else if (logoutType === 'redirect') {
      instance.logoutRedirect();
    }
  };

  const handleAccountSelection = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={event => setAnchorEl(event.currentTarget)} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleAccountSelection()} key="switchAccount">
          Switch Account
        </MenuItem>
        <MenuItem onClick={() => handleLogout('popup')} key="logoutPopup">
          Logout using Popup
        </MenuItem>
        <MenuItem onClick={() => handleLogout('redirect')} key="logoutRedirect">
          Logout using Redirect
        </MenuItem>
      </Menu>
      <AccountPicker open={accountSelectorOpen} onClose={handleClose} />
    </div>
  );
}
