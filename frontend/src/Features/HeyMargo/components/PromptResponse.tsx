import { Paper } from '@mui/material';

import useTranscribe from '@/hooks/useTranscribe';

export default function PromptResponse() {
  const { data } = useTranscribe('neo4j');

  return (
    <Paper elevation={3} sx={{ padding: 2, width: { xs: '75%', sm: '50%', md: '30%' } }}>
      {`response: ${data}`}
    </Paper>
  );
}
