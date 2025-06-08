import { Stack } from '@mui/material';

import PromptResponses from '@/Features/HeyMargo/components/PromptResponses';
import ResponseStrategies from '@/Features/HeyMargo/components/ResponseStrategies';
import UserPrompt from '@/Features/HeyMargo/components/UserPrompt';
import MicrophoneButton from '@/Features/RecordVoice/components/MicrophoneButton';
import PromptTypeSelector from '@/Features/RecordVoice/components/PromptTypeSelector';
import { PromptProvider } from '@/hooks/useOpenAIVoice/PromptProvider';

export default function HeyMargo() {
  return (
    <PromptProvider>
      <Stack direction="column" alignItems="center" spacing={1}>
        <MicrophoneButton />
        <PromptTypeSelector />
      </Stack>
      <UserPrompt />

      <ResponseStrategies>
        <PromptResponses />
      </ResponseStrategies>
    </PromptProvider>
  );
}
