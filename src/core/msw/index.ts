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

  // const onUnhandledRequest = isCypress ? 'warn' : 'error';
  const onUnhandledRequest = 'warn';
  const mswConfig: Partial<SharedOptions> = { onUnhandledRequest };

  if (isCypress) return; // do not use msw when running cypress

  if (isNextServer || isTestEnv) {
    const { server } = await import('./server');
    server.listen(mswConfig);

    console.log('test', 'msw-server');

    return () => server.close();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require('./browser');

    console.log('test', 'msw-worker');

    void worker
      .start()
      .then(() => {
        console.log('test', 'msw-worker-started');
      })
      .catch(({ e }) => {
        console.log('test', 'msw-worker-error', { e });
      });

    return () => worker.stop();
  }
}

export function resetMswHandlers() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { server } = require('./server');
  server.resetHandlers();
}
