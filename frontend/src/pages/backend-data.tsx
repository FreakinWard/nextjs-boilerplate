import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define the type for our backend data
interface BackendData {
  message?: string;
  status?: string;
}

export default function BackendDataPage() {
  const [data, setData] = useState<BackendData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from our FastAPI backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Backend Data
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          {loading && <Typography>Loading data from backend...</Typography>}

          {error && <Typography color="error">Error fetching data: {error}</Typography>}

          {data && !loading && !error && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Response from Backend:
              </Typography>
              <Typography
                variant="body1"
                component="pre"
                sx={{
                  bgcolor: '#f5f5f5',
                  p: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
                {JSON.stringify(data, null, 2)}
              </Typography>
            </Box>
          )}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Link href="/">
            <Typography sx={{ color: '#0070f3', cursor: 'pointer' }}>← Back to Home</Typography>
          </Link>

          <Link href="/health-check">
            <Typography sx={{ color: '#0070f3', cursor: 'pointer' }}>
              View Health Check →
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

BackendDataPage.title = 'Backend Data';
