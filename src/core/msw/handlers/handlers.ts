import { seedAuthProviders, seedAuthSession } from '../seed/seedAuth';
import seedHealth from '../seed/seedHealth';
import seedMswDemo from '../seed/seedMswDemo';
import seedPosts from '../seed/seedPosts';
import {
  handlePassThroughGet,
  handlePassThroughPost,
  handleRestGet,
  handleRestPost,
} from './util/restHandlers';

export default [
  // app - expected pass through
  handlePassThroughPost('*/track'),
  handlePassThroughPost('*/QuickPulseService.svc/post'),

  handlePassThroughGet('*.svg'),
  handlePassThroughGet('*.ico'),
  handlePassThroughGet('/_next/*'),

  // auth
  handleRestGet(seedAuthSession),
  handleRestGet(seedAuthProviders),

  // app
  handleRestGet(seedPosts),
  handleRestGet(seedHealth),

  // msw tests
  handleRestGet(seedMswDemo),
  handleRestPost(seedMswDemo),
];
