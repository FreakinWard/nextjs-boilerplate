/* istanbul ignore file */

'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

export default function AppStateApp({ children }) {
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
