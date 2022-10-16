import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { Post } from '../../services/postsService';
import NextInfo from './components/NextInfo';
import RenderExamples from './components/RenderExamples';

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Typography component="h1"></Typography>
      <h1>
        Welcome to
        <Link href="https://nextjs.org">
          <a style={{ color: '#0070f3' }}> Next.js!</a>
        </Link>
      </h1>
      <RenderExamples posts={posts} />
      <NextInfo />
    </>
  );
}
