import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define the type for our health check data
interface HealthData {
  status: string;
}

export default function HealthCheckPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHealthData() {
      try {
        // Fetch data from our FastAPI backend health endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`);

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

    fetchHealthData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Backend Health Check
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          {loading && <Typography>Checking backend health...</Typography>}

          {error && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ErrorIcon color="error" />
              <Typography color="error">Error checking health: {error}</Typography>
            </Box>
          )}

          {data && !loading && !error && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Backend Status:
              </Typography>

              {data.status === 'healthy' ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" />
                  <Chip
                    label={data.status}
                    color="success"
                    variant="outlined"
                    sx={{ fontSize: '1.1rem', px: 1 }}
                  />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ErrorIcon color="error" />
                  <Chip
                    label={data.status}
                    color="error"
                    variant="outlined"
                    sx={{ fontSize: '1.1rem', px: 1 }}
                  />
                </Box>
              )}

              <Box sx={{ mt: 3 }}>
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
            </Box>
          )}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Link href="/">
            <Typography sx={{ color: '#0070f3', cursor: 'pointer' }}>← Back to Home</Typography>
          </Link>

          <Link href="/backend-data">
            <Typography sx={{ color: '#0070f3', cursor: 'pointer' }}>
              View Backend Data →
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

HealthCheckPage.title = 'Health Check';
