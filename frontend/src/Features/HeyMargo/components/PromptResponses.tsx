import PromptForQuestion from '@/Features/HeyMargo/components/PromptForQuestion';
import PromptTranscribe from '@/Features/HeyMargo/components/PromptTranscribe';
import { usePrompt } from '@/hooks/useOpenAIVoice/PromptProvider';

export default function PromptResponses() {
  const { promptType, text } = usePrompt();

  if (!text) return null;

  if (promptType === 'question') {
    return (
      <>
        <PromptForQuestion strategy="neo4j" />
        <PromptForQuestion strategy="postgres" />
      </>
    );
  }

  if (promptType === 'command') {
    return (
      <>
        <PromptTranscribe strategy="neo4j" />
        <PromptTranscribe strategy="postgres" />
      </>
    );
  }

  return <>unknown prompt type</>;
}
