export function setupMsw() {
  const mswConfig = { onUnhandledRequest: 'error' };

  const isNextServer = typeof window === 'undefined';
  const isTestEnv = process.env.NODE_ENV === 'test';

  if (isNextServer || isTestEnv) {
    console.log('test', 'server', { isNextServer });

    const { server } = require('./server');
    server.listen(mswConfig);

    const cleanup = () => server.close();

    return cleanup;
  } else {
    console.log('test', 'browser', { isNextServer });

    const { worker } = require('./browser');
    // void worker.start();

    const cleanup = () => worker.stop();

    return cleanup;
  }
}

export function resetMswHandlers() {
  const { server } = require('./server');
  server.resetHandlers();
}
