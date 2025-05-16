import Typography from '@mui/material/Typography';

export default function AppTitle() {
  return (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
      <Typography variant="h5" sx={{ flexGrow: 1, justifyContent: 'center' }}>
        NextJs
      </Typography>
    </>
  );
}
