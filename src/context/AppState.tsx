import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface Props {
  children: ReactNode;
}

async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    const { setupMsw } = await import('../core/msw');
    setupMsw();
  }
};

export default function AppState({ children }: Props) {
  const queryConfig = {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  };
  const queryClient = new QueryClient(queryConfig);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
