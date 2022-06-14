import { setupServer } from 'msw/node';

import { serverHandlers } from './handlers';

// eslint-disable-next-line import/prefer-default-export
export const server = setupServer(...serverHandlers);
