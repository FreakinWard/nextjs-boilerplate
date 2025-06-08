import { usePrompt } from '@/hooks/useOpenAIVoice/PromptProvider';
import usePost from '@/hooks/usePost';

export type Strategy = 'neo4j' | 'postgres';

export default function usePromptForTranscribe(strategy: Strategy) {
  const { text } = usePrompt();

  console.log('test - usePromptForTranscribe', { text });

  return usePost({
    cacheKey: 'transcribe',
    body: { prompt: text, type: strategy },
    url: '/api/transcribe',
    enabled: !!text,
  });
}
