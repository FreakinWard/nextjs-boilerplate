import { AppBar as MuiAppBar, Toolbar } from '@material-ui/core';
import React from 'react';

import SignInSignOutButton from './SignInSignOutButton';
import WelcomeName from './WelcomeName';

export default function AppBar() {
  return (
    <MuiAppBar>
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <WelcomeName />
        <SignInSignOutButton />
      </Toolbar>
    </MuiAppBar>
  );
}
