import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { setConfig } from 'next/config';

import { publicRuntimeConfig } from './next.config';
import mswServer from './src/core/mocks/mswServer';

setConfig({ publicRuntimeConfig });

beforeAll(() => {
  mswServer.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
