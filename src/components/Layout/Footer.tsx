import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import FooterContent from './components/FooterContent';

export default function Footer() {
  return (
    <>
      <Box marginTop={10} data-testid="footer" />
      <AppBar sx={{ top: 'auto', bottom: 0, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Toolbar>
            <FooterContent />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
