import { SharedOptions } from 'msw';

declare global {
  interface Window {
    Cypress;
  }
}

/**
 * Sets up msw to be used for the Next.js app.
 *
 * NOTE: Unhandled http requests will error the server.
 *
 * To avoid this, ensure that all http requests are mocked in `msw/handlers.ts`.
 * @example
 * if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
 *   // eslint-disable-next-line @typescript-eslint/no-var-requires
 *   const { mswSetupNextJs } = require('../core/msw');
 *   void mswSetupNextJs();
 * }
 *
 */
export async function mswSetupNextJs() {
  const isTestEnv = process.env.NODE_ENV === 'test';
  if (isTestEnv) return;

  const isNextServer = typeof window === 'undefined';
  const isCypress = !isNextServer && Boolean(window.Cypress);

  const onUnhandledRequest = isCypress ? 'warn' : 'error';
  const mswConfig: Partial<SharedOptions> = { onUnhandledRequest };

  if (isCypress) return; // do not use msw when running cypress

  if (isNextServer) {
    // use msw server to intercept server requests
    const { server } = await import('./server');
    server.listen(mswConfig);

    return;
  }

  // use msw browser to intercept client requests
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./browser');
  void worker.start();
}

export function resetMswHandlers() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { server } = require('./server');
  server.resetHandlers();
}
