import { Paper } from '@mui/material';

import { usePrompt } from '@/hooks/useOpenAIVoice/PromptProvider';

export default function Prompt() {
  const { text } = usePrompt();
  return (
    <Paper elevation={3} sx={{ p: 2, m: 2, width: { xs: '75%', sm: '50%', md: '30%' } }}>
      {`prompt: ${text}`}
    </Paper>
  );
}
