import '@testing-library/jest-dom';
import 'whatwg-fetch';

import mswServer from './src/core/mocks/mswServer';

beforeAll(() => mswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

global.console.log = message => {
  throw message;
};

global.console.warn = message => {
  throw message;
};

global.console.error = message => {
  throw message;
};
