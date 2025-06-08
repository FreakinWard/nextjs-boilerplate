import CenteredQuote from '@/Features/HeyMargo/components/CenteredQuote';
import { usePrompt } from '@/hooks/useOpenAIVoice/PromptProvider';

export default function Prompt() {
  const { text } = usePrompt();

  if (!text) return null;

  return <CenteredQuote>{text}</CenteredQuote>;
}
