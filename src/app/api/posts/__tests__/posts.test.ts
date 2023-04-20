import { testApiHandler } from 'next-test-api-route-handler';

import seedPosts from '../../../../core/msw/seed/seedPosts';
import { mswMock } from '../../../../core/test.utils';
import { GET as handler, PostType } from '../route';

// TODO: waiting for next-test-api-route-handler to support next 13 app routes
// https://github.com/Xunnamius/next-test-api-route-handler/issues/773
describe.skip('/api/posts', () => {
  mswMock();

  it('should render expected health data', async () => {
    // arrange
    const expected = seedPosts.data;

    await testApiHandler<PostType[]>({
      handler,
      test: async ({ fetch }) => {
        // act
        const res = await fetch({ method: 'POST', body: 'data' });
        const result = await res.json();

        // assert
        expect(result).toEqual(expected);
      },
    });
  });
});
