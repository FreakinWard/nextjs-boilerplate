/**
 * @returns cleanup function
 */
export function setupMsw() {
  const isTestEnv = process.env.NODE_ENV === 'test';
  const isNextServer = typeof window === 'undefined';
  const isCypress = !isNextServer && Boolean(window.Cypress);

  const onUnhandledRequest = isCypress ? 'warn' : 'error';
  const mswConfig = { onUnhandledRequest };

  if (isCypress) return; // do not use msw when running cypress

  if (isNextServer || isTestEnv) {
    const { server } = require('./server');
    server.listen(mswConfig);

    return () => server.close();
  } else {
    const { worker } = require('./browser');
    worker.start();

    return () => worker.stop();
  }
}

export function resetMswHandlers() {
  const { server } = require('./server');
  server.resetHandlers();
}
