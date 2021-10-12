import { useMsal } from '@azure/msal-react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import React from 'react';

import { loginRequest } from '../../services/authConfig';

export default function SignInButton() {
  const { instance } = useMsal();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogin = loginType => {
    setAnchorEl(null);

    if (loginType === 'popup') {
      instance.loginPopup(loginRequest);
    } else if (loginType === 'redirect') {
      instance.loginRedirect(loginRequest);
    }
  };

  return (
    <div>
      <Button onClick={event => setAnchorEl(event.currentTarget)} color="inherit">
        Login
      </Button>
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
        <MenuItem onClick={() => handleLogin('popup')} key="loginPopup">
          Sign in using Popup
        </MenuItem>
        <MenuItem onClick={() => handleLogin('redirect')} key="loginRedirect">
          Sign in using Redirect
        </MenuItem>
      </Menu>
    </div>
  );
}
