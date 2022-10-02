import { QueryClient, QueryClientProvider } from 'react-query';

import { resetMswHandlers, setupMsw } from './msw';

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

export const mswMock = () => {
  let mswCleanup;

  beforeAll(() => {
    mswCleanup = setupMsw();
  });

  afterEach(() => resetMswHandlers());

  afterAll(() => {
    mswCleanup();
  });
};
