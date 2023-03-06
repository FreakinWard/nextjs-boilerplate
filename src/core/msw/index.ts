import { SharedOptions } from 'msw';

declare global {
  interface Window {
    Cypress;
  }
}

/**
 * @returns cleanup function
 */
export async function setupMsw() {
  const isTestEnv = process.env.NODE_ENV === 'test';
  const isNextServer = typeof window === 'undefined';
  // @ts-ignore
  const isCypress = !isNextServer && Boolean(window.Cypress);

  const onUnhandledRequest = isCypress ? 'warn' : 'error';
  const mswConfig: Partial<SharedOptions> = { onUnhandledRequest };

  if (isCypress) return; // do not use msw when running cypress

  if (isNextServer || isTestEnv) {
    const { server } = await import('./server');
    server.listen(mswConfig);

    return () => server.close();
  } else {
    const { worker } = require('./browser');
    void worker.start();

    return () => worker.stop();
  }
}

export function resetMswHandlers() {
  const { server } = require('./server');
  server.resetHandlers();
}
