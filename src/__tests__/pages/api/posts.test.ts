import { testApiHandler } from 'next-test-api-route-handler';

import mswSetupJest from '../../../core/msw/mswSetupJest';
import seedPosts from '../../../core/msw/seed/seedPosts';
import posts, { PostsTypes } from '../../../pages/api/posts';

describe('/api/posts', () => {
  mswSetupJest();

  it('should render expected health data', async () => {
    // arrange
    const handler = posts;
    const expected = seedPosts.data;

    await testApiHandler<PostsTypes>({
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
