import { render, screen } from '@testing-library/react';

import seedPosts from '../core/mocks/seed/seedPosts';
import { queryWrapper as wrapper } from '../core/test.utils';
import Home, { Comment } from '../pages/index';

describe('index', () => {
  const comment: Comment = {
    id: 1,
    body: 'bodyValue1',
  };
  const tree = <Home comment={comment} />;

  it('should render staticProps', () => {
    // arrange
    const expectedComment = `id: ${comment.id} - body: ${comment.body}`;

    // act
    render(tree, { wrapper });

    // assertX
    screen.getByText(expectedComment);
  });

  it('should render client-fetched posts', async () => {
    // arrange
    const expectedPosts = `Length: ${seedPosts.length}`;

    // act
    render(tree, { wrapper });

    // assert
    await screen.findByText(expectedPosts);
  });
});
