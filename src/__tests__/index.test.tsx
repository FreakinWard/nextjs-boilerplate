import { render, screen } from '@testing-library/react';

import seedPosts from '../core/mocks/seed/seedPosts';
import { queryWrapper as wrapper } from '../core/test.utils';
import Home from '../pages/index';
import { Post } from '../services/postsService';

describe('index', () => {
  const posts: Post[] = [
    {
      id: 11,
      title: 'titleValue11',
    },
    {
      id: 12,
      title: 'titleValue12',
    },
  ];
  const tree = <Home posts={posts} />;

  it('should render staticProps', () => {
    // arrange
    const postLength = `Length: ${posts.length}`;

    // act
    render(tree, { wrapper });

    // assert
    expect(screen.getByText(postLength)).toBeInTheDocument();

    posts.forEach((post) => {
      expect(screen.getByText(`${post.id} - ${post.title}`)).toBeInTheDocument();
    });
  });

  it('should render client-fetched posts', async () => {
    // arrange
    const postLength = `Length: ${seedPosts.length}`;

    // act
    render(tree, { wrapper });

    // assert
    expect(await screen.findByText(postLength)).toBeInTheDocument();

    seedPosts.forEach((post) => {
      expect(screen.getByText(`${post.id} - ${post.title}`)).toBeInTheDocument();
    });
  });
});
