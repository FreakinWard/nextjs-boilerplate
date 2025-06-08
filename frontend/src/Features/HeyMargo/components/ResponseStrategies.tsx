import { Grid } from '@mui/system';
import { ReactNode } from 'react';

interface PromptResponsesProps {
  children: ReactNode;
}
export default function ResponseStrategies({ children }: PromptResponsesProps) {
  return (
    <Grid container size={{ xs: 12, sm: 6 }} spacing={2}>
      {children}
    </Grid>
  );
}
