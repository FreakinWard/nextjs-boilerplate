import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/system';

import usePromptForTranscribe, { Strategy } from '@/hooks/usePromptForTranscribe';

interface PromptResponseProps {
  strategy: Strategy;
}

export default function PromptTranscribe({ strategy }: PromptResponseProps) {
  const { data } = usePromptForTranscribe(strategy);

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
