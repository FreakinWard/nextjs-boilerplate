import Prompt from '@/Features/HeyMargo/components/Prompt';
import PromptResponse from '@/Features/HeyMargo/components/PromptResponse';
import ResponseStrategies from '@/Features/HeyMargo/components/ResponseStrategies';
import MicrophoneButton from '@/Features/RecordVoice/components/MicrophoneButton';
import { PromptProvider } from '@/hooks/useOpenAIVoice/PromptProvider';

export default function HeyMargo() {
  return (
    <PromptProvider>
      <MicrophoneButton />
      <Prompt />

      <ResponseStrategies>
        <PromptResponse strategy="neo4j" />
        <PromptResponse strategy="postgres" />
      </ResponseStrategies>
    </PromptProvider>
  );
}
