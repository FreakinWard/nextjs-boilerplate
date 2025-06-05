import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../core/msw/server';
import { AppWrapper as wrapper, mswMock } from '../../core/test.utils';
import BackendDataPage from '../../pages/backend-data';

describe('BackendDataPage', () => {
  // Set up MSW for API mocking
  mswMock();

  // Mock data for the backend API
  const mockBackendData = {
    message: 'Hello World from FastAPI',
  };

  // Mock the API endpoint
  beforeEach(() => {
    // Add a handler to mock the backend API endpoint
    server.use(
      rest.get(`${process.env.NEXT_PUBLIC_API_URL}/`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockBackendData));
      })
    );
  });

  it('should render the loading state initially', () => {
    // Render the component
    render(<BackendDataPage />, { wrapper });

    // Check that the loading message is displayed
    expect(screen.getByText('Loading data from backend...')).toBeInTheDocument();
  });

  it('should render the backend data when loaded successfully', async () => {
    // Render the component
    render(<BackendDataPage />, { wrapper });

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading data from backend...')).not.toBeInTheDocument();
    });

    // Check that the data is displayed
    expect(screen.getByText('Response from Backend:')).toBeInTheDocument();
    expect(screen.getByText(/"message": "Hello World from FastAPI"/)).toBeInTheDocument();
  });

  it('should render an error message when the API call fails', async () => {
    // Override the handler to return an error
    server.use(
      rest.get(`${process.env.NEXT_PUBLIC_API_URL}/`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
      })
    );

    // Render the component
    render(<BackendDataPage />, { wrapper });

    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.queryByText('Loading data from backend...')).not.toBeInTheDocument();
    });

    // Check that the error message is displayed
    expect(screen.getByText(/Error fetching data:/)).toBeInTheDocument();
  });

  it('should have navigation links to home and health check pages', () => {
    // Render the component
    render(<BackendDataPage />, { wrapper });

    // Check that the navigation links are displayed
    expect(screen.getByText('← Back to Home')).toBeInTheDocument();
    expect(screen.getByText('View Health Check →')).toBeInTheDocument();
  });
});
