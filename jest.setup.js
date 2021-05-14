import '@testing-library/jest-dom';
import 'whatwg-fetch';

import mswServer from './src/utils/mocks/mswServer';

beforeAll(() => mswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
