import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function AppMenu() {
  return (
    <>
      <AdbIcon sx={{ color: 'white', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Link href="/" passHref>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'white',
          }}
        >
          LOGO
        </Typography>
      </Link>
    </>
  );
}
