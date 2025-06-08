import { Switch } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

import { usePrompt } from '@/hooks/useOpenAIVoice/PromptProvider';

export default function PromptTypeSelector() {
  const { promptType, togglePromptType } = usePrompt();

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Typography>Question</Typography>
      <Switch onChange={togglePromptType} checked={promptType === 'command'} />
      <Typography>Transcribe</Typography>
    </Stack>
  );
}
