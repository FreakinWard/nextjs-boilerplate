// import useOpenAIVoice from '@/hooks/useOpenAIVoice';

import { usePrompt } from '@/hooks/useOpenAIVoice/PromptProvider';
import usePost from '@/hooks/usePost';

export type Strategy = 'neo4j' | 'postgres';

export default function useTranscribe(strategy: Strategy) {
  const { text } = usePrompt();

  return usePost({
    cacheKey: 'transcribe',
    body: { prompt: text, type: strategy },
    url: '/api/transcribe',
    enabled: !!text,
  });
}
