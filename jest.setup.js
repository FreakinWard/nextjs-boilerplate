import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { resetMswHandlers, setupMsw } from './src/core/msw';

let mswCleanup;

beforeAll(() => (mswCleanup = setupMsw()));
afterEach(() => resetMswHandlers());
afterAll(() => mswCleanup());

global.console.log = message => {
  throw message;
};

global.console.warn = message => {
  throw message;
};

global.console.error = message => {
  throw message;
};
