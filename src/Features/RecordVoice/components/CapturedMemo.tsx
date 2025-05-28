import TextField from '@mui/material/TextField';

interface CapturedMemoProps {
  value: string;
}

export default function CapturedMemo({ value }: CapturedMemoProps) {
  return (
    <TextField
      value={value}
      sx={{ width: { xs: '75%', sm: '50%', md: '30%' } }}
      multiline
      rows={4}
      placeholder="Press record to start"
    />
  );
}
