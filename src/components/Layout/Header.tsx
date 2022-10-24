import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import AppMenu from './components/AppMenu';
import AppTitle from './components/AppTitle';
import LoginButton from './components/LoginButton';

export default function Header() {
  return (
    <>
      <AppBar data-testid="header">
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <AppMenu />
            <AppTitle />
            <LoginButton />
          </Toolbar>
        </Container>
      </AppBar>
      <Box marginBottom={10} />
    </>
  );
}
