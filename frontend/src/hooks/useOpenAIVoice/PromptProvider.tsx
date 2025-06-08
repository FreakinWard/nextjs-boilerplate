import { createContext, useContext, useMemo, useState } from 'react';

import useOpenAIVoice from '@/hooks/useOpenAIVoice/index';

const PromptContext = createContext(undefined);

/**
 * The `PromptProvider` component wraps the given `children` with a
 * `PromptContext.Provider` component, providing the `useOpenAIVoice` hook,
 * the current prompt type, and a function to toggle the prompt type.
 *
 * The `PromptProvider` component is useful when you want to use the
 * `usePrompt` hook in a component that is not a direct child of the
 * `PromptProvider` component.
 *
 * @example
 *
 **/
function PromptProvider({ children }) {
  const [promptType, setPromptType] = useState('question');
  const openAIVoice = useOpenAIVoice();

  const togglePromptType = () => {
    setPromptType(promptType === 'question' ? 'command' : 'question');
    openAIVoice.clearText();
  };

  const value = useMemo(
    () => ({ ...openAIVoice, promptType, togglePromptType }),
    [openAIVoice, promptType, togglePromptType]
  );

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
