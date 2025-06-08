import Box from '@mui/material/Box';

export default function CenteredQuote({ children }: { children: string }) {
  return (
    <Box
      sx={{
        padding: 2,
        width: { xs: '75%', sm: '50%', md: '30%' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontStyle: 'italic',
      }}
    >
      <q>{children}</q>
    </Box>
  );
}
