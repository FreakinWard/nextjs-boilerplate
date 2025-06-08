import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/system';

import useTranscribe, { Strategy } from '@/hooks/useTranscribe';

interface PromptResponseProps {
  strategy: Strategy;
}

export default function PromptResponse({ strategy }: PromptResponseProps) {
  const { data } = useTranscribe(strategy);

  return (
    <Grid>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6">
          <strong>
            <i>{strategy}</i>
          </strong>
        </Typography>
        {data}
      </Paper>
    </Grid>
  );
}
