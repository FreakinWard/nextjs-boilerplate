import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

import LoginMenu from './LoginMenu';

export default function LoginButton() {
  const { status, data: session } = useSession();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (status === 'authenticated') {
    return (
      <>
        <Tooltip title={session.user.name}>
          <IconButton onClick={handleClick}>
            <Avatar alt={session.user.name} src={session.user.image} />
          </IconButton>
        </Tooltip>

        <LoginMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
      </>
    );
  } else {
    // console.log('test', { signIn });

    return (
      <Button sx={{ color: 'white' }} size="large" onClick={() => signIn()}>
        Sign In
      </Button>
    );
  }
}
