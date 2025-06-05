import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { Post } from '../../pages/api/posts';
// import { Post } from '../../services/postsService';
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
        <Link href="https://nextjs.org" legacyBehavior>
          <a style={{ color: '#0070f3' }}> Next.js!</a>
        </Link>
      </h1>
      <ul>
        <li>
          <Link href="/record-voice" legacyBehavior>
            <a style={{ color: '#0070f3' }}>Record Voice Memo</a>
          </Link>
        </li>
      </ul>
      <Box sx={{ my: 3, display: 'flex', gap: 2 }}>
        <Link href="/backend-data" passHref>
          <Button variant="contained" color="primary">
            View Backend Data
          </Button>
        </Link>

        <Link href="/health-check" passHref>
          <Button variant="contained" color="secondary">
            Backend Health Check
          </Button>
        </Link>
      </Box>

      <RenderExamples posts={posts} />
      <NextInfo />
    </>
  );
}
