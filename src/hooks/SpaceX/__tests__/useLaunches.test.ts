import mswSetupJest from '../../../core/msw/mswSetupJest';
import { renderHookQuery } from '../../../core/testMethods/hookMethods';
import usePosts from '../../usePosts';
import useLaunches from '../useLaunches';

describe('useLaunches', () => {
  mswSetupJest();

  it.skip('should render posts', async () => {
    // arrange

    // act
    await renderHookQuery(usePosts);
    // assert
  });

  it('should render launches', async () => {
    // arrange

    // act
    await renderHookQuery(useLaunches);
    // assert
  });
});
