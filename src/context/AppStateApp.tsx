/* istanbul ignore file */

'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

import { setupMsw } from '../core/msw';

// /* istanbul ignore next */
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupMsw } = require('../core/msw');
  void setupMsw();
}

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
