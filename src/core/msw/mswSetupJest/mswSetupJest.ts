import { SharedOptions } from 'msw';

import { server } from '../server';
import { failTestOnUnhandledRequest, onUnhandledRequest } from './util/mswUtility';

const setupMswServer = () => {
  const mswConfig: Partial<SharedOptions> = { onUnhandledRequest };

  return server.listen(mswConfig);
};

/**
 * This function sets up msw to be used for jest testing.
 *
 * NOTE: Unhandled http requests will fail the test.
 *
 * To avoid this, ensure that all http requests are mocked in `msw/handlers.ts`.
 *
 * @example global setup using a jest setup file
 * // jest.config.js
 * module.exports = {
 *   // ... other options ...
 *   setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
 * };
 *
 * // setupTests.ts
 * import { mswJestSetup } from './core/msw/mswSetupJest';
 *
 * mswJestSetup();
 *
 * @example individual test suites
 *  desc('MyComponent', () => {
 *    mswSetupJest();
 *
 *    it('should...', ()=> {
 *      // ...
 *    });
 *  });
 *
 * @returns {void}
 */
export default function mswSetupJest() {
  beforeAll(() => setupMswServer());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  failTestOnUnhandledRequest();
}
