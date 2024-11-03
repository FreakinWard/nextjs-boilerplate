import { Post } from '../../../pages/api/posts';
import { SeedRest } from '../types';

const postsEmpty: Post[] = [];

const postsSingle: Post[] = [
  {
    id: 1,
    title: 'MockPost 1',
  },
];

const postsMultiple: Post[] = [
  {
    id: 1,
    title: 'MockPost 1',
  },
  {
    id: 2,
    title: 'MockPost 2',
  },
  {
    id: 3,
    title: 'MockPost 3',
  },
];

export const seedPostsEmpty: SeedRest<Post[]> = {
  url: '*/posts',
  data: postsEmpty,
};

export const seedPostsSingle: SeedRest<Post[]> = {
  url: '*/posts',
  data: postsSingle,
};

const seedPostsMultiple: SeedRest<Post[]> = {
  url: '*/posts',
  data: postsMultiple,
};

export default seedPostsMultiple;
