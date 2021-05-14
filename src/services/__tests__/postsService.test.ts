import seedPosts from '../../utils/mocks/seed/seedPosts';
import { fetchPosts } from '../postsService';

describe('postsService', () => {
  it('should return fetch posts and return them', async () => {
    // arrange
    // act
    const results = await fetchPosts();

    // assert
    expect(results).toEqual(seedPosts);
  });
});
