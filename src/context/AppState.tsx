import { DefaultSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import AuthGuard from '../components/AuthGuard';

interface Props {
  children: ReactNode;
  requireAuth: boolean;
  session: DefaultSession;
}

/* istanbul ignore next */
async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    const { setupMsw } = await import('../core/msw');
    setupMsw();
  }
};

export default function AppState({ children, requireAuth, session }: Props) {
  const queryConfig = {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  };
  const queryClient = new QueryClient(queryConfig);

  return (
    <SessionProvider session={session}>
      <AuthGuard requireAuth={requireAuth}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </AuthGuard>
    </SessionProvider>
  );
}
