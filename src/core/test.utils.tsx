import { QueryClient, QueryClientProvider } from 'react-query';

const queryConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

export const queryWrapper = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={new QueryClient(queryConfig)}>{children}</QueryClientProvider>
);
