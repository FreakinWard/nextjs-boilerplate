import { createContext, useContext } from 'react';

import useOpenAIVoice from '@/hooks/useOpenAIVoice/index';

const PromptContext = createContext(undefined);

function PromptProvider({ children }) {
  const openAIVoice = useOpenAIVoice();

  const value = { ...openAIVoice };

  return <PromptContext.Provider value={value}>{children}</PromptContext.Provider>;
}

function usePrompt() {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error('usePrompt must be used within a PromptProvider');
  }

  return context;
}

export { PromptProvider, usePrompt };
