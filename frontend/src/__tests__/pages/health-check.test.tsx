import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../core/msw/server';
import { AppWrapper as wrapper, mswMock } from '../../core/test.utils';
import HealthCheckPage from '../../pages/health-check';

describe('HealthCheckPage', () => {
  // Set up MSW for API mocking
  mswMock();

  // Mock the API endpoint
  beforeEach(() => {
    // Add a handler to mock the health API endpoint with a healthy status
    server.use(
      rest.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'healthy' }));
      })
    );
  });

  it('should render the loading state initially', () => {
    // Render the component
    render(<HealthCheckPage />, { wrapper });

    // Check that the loading message is displayed
    expect(screen.getByText('Checking backend health...')).toBeInTheDocument();
  });

  it('should render the healthy status when backend is healthy', async () => {
    // Render the component
    render(<HealthCheckPage />, { wrapper });

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.queryByText('Checking backend health...')).not.toBeInTheDocument();
    });

    // Check that the healthy status is displayed
    expect(screen.getByText('Backend Status:')).toBeInTheDocument();
    expect(screen.getByText('healthy')).toBeInTheDocument();
  });

  it('should render the unhealthy status when backend is not healthy', async () => {
    // Override the handler to return an unhealthy status
    server.use(
      rest.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'unhealthy' }));
      })
    );

    // Render the component
    render(<HealthCheckPage />, { wrapper });

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.queryByText('Checking backend health...')).not.toBeInTheDocument();
    });

    // Check that the unhealthy status is displayed
    expect(screen.getByText('Backend Status:')).toBeInTheDocument();
    expect(screen.getByText('unhealthy')).toBeInTheDocument();
  });

  it('should render an error message when the API call fails', async () => {
    // Override the handler to return an error
    server.use(
      rest.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
      })
    );

    // Render the component
    render(<HealthCheckPage />, { wrapper });

    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.queryByText('Checking backend health...')).not.toBeInTheDocument();
    });

    // Check that the error message is displayed
    expect(screen.getByText(/Error checking health:/)).toBeInTheDocument();
  });

  it('should have navigation links to home and backend data pages', () => {
    // Render the component
    render(<HealthCheckPage />, { wrapper });

    // Check that the navigation links are displayed
    expect(screen.getByText('← Back to Home')).toBeInTheDocument();
    expect(screen.getByText('View Backend Data →')).toBeInTheDocument();
  });
});
