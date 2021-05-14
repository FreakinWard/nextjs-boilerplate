import { setupServer } from 'msw/node';

import mswHandlers from './mswHandlers';

export default setupServer(...mswHandlers);
