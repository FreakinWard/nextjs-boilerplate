import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function AppLogo() {
  return (
    <div aria-label="application logo">
      <AdbIcon sx={{ color: 'white', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Link href="/" passHref>
        <Typography
          variant="h6"
          noWrap
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
    </div>
  );
}
