// import useOpenAIVoice from '@/hooks/useOpenAIVoice';

import { usePrompt } from '@/hooks/useOpenAIVoice/PromptProvider';
import usePost from '@/hooks/usePost';

export type Strategy = 'neo4j' | 'postgres';

export default function usePromptForQuestion(strategy: Strategy) {
  const { text } = usePrompt();

  console.log('test - usePromptForQuestion', { text });

  return usePost({
    cacheKey: 'promptForTranscribe',
    body: { prompt: text, type: strategy },
    url: '/api/ask',
    enabled: !!text,
  });
}
