import { render, screen } from '@testing-library/react';

import seedPosts from '../../core/msw/seed/seedPosts';
import { AppWrapper as wrapper, mswMock } from '../../core/test.utils';
import Home, { getStaticProps } from '../../pages';
import { Post } from '../../pages/api/posts';

describe('index', () => {
  mswMock();

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

    posts.forEach(post => {
      expect(screen.getByText(`${post.id} - ${post.title}`)).toBeInTheDocument();
    });
  });

  it('should return expected context given getStaticProps is called', async () => {
    // arrange
    const expected = { props: { posts: seedPosts.data } };

    // act
    const response = await getStaticProps();

    // assert
    expect(response).toEqual(expected);
  });

  it('should render client-fetched posts', async () => {
    // arrange
    const postLength = `Length: ${seedPosts.data.length}`;

    // act
    render(tree, { wrapper });

    // assert
    expect(await screen.findByText(postLength)).toBeInTheDocument();

    seedPosts.data.forEach(post => {
      expect(screen.getByText(`${post.id} - ${post.title}`)).toBeInTheDocument();
    });
  });
});
