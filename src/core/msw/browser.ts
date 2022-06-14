import { setupWorker } from 'msw';

import { browserHandlers } from './handlers';

// eslint-disable-next-line import/prefer-default-export
export const worker = setupWorker(...browserHandlers);
