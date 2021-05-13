import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface Props {
  children: ReactNode;
}

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
