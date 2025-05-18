# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Run Commands

### Setup and Installation
```bash
# Install dependencies
npm install

# Create .env file (required before running the app)
# Required contents:
# NEXT_PUBLIC_API_MOCKING=disabled
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=hUZffSRxfqTsXF/08mFxO/T1p0pq2c5pXuZQ82CkSAU=
```

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Analyze bundle size
npm run build:analyze

# Start with AppInsights
npm run start:insights
```

### Docker Development
```bash
# Start development environment
docker compose up dev

# Start production environment
docker compose up prod
```

### Linting and Formatting
```bash
# Run linting
npm run lint

# Run linting with fixes
npm run lint:fix

# Check code formatting
npm run format

# Fix code formatting
npm run format:fix
```

### Testing
```bash
# Run all unit tests
npm run test

# Open test report
npm run test:open

# Run tests with coverage
npm run test:cover

# Open coverage report
npm run test:cover:open

# Run end-to-end tests
npm run test:e2e

# Open Cypress for interactive e2e testing
npm run test:e2e:open
```

## Architecture Overview

This is a Next.js application with the following key architectural components:

### Core Structure
- **Next.js Pages**: Located in `/src/pages` - follows the standard Next.js routing convention
  - API routes are in `/src/pages/api`
  - Authentication is handled through NextAuth in `/src/pages/api/auth/[...nextauth].ts`
  
- **Features**: Located in `/src/Features` - contains feature-specific components organized by domain
  - Each feature has its own directory with components, e.g., `/src/Features/Home`

- **Components**: Located in `/src/components` - shared UI components used across the application
  - Layout components handle the overall UI structure
  - AuthGuard controls access to protected routes
  - AppTelemetry provides Application Insights integration
  
- **Context**: Located in `/src/context` - contains React context providers
  - AppState is the main application state provider that wraps other providers:
    - SessionProvider (Next Auth)
    - TelemetryProvider
    - QueryClientProvider (React Query)
    - AuthGuard (for protected routes)

- **Hooks**: Located in `/src/hooks` - custom React hooks
  - useFetch - generic data fetching with React Query
  - Domain-specific hooks that use useFetch (e.g., usePosts)

- **Testing**: Uses Jest and React Testing Library
  - MSW (Mock Service Worker) for API mocking during tests
  - test.utils.tsx provides testing utilities like AppWrapper for wrapping components

### Data Flow
1. Pages or components use custom hooks (e.g., usePosts) to fetch data
2. These hooks use useFetch, which leverages React Query for data fetching and caching
3. API routes in /src/pages/api serve data for the frontend
4. Authentication state is managed through NextAuth and is available via SessionProvider

### Testing Strategy
- Unit tests for components, hooks, and services
- API route testing in /src/__tests__/pages/api
- End-to-end tests using Cypress
- MSW for mocking HTTP requests in tests

### Styling
- Uses CSS modules
- MUI (Material-UI) for components
- Emotion for styling MUI components

## Common Development Patterns

### Adding a New Feature
1. Create a new directory in `/src/Features`
2. Add necessary components within the feature directory
3. Create any required API endpoints in `/src/pages/api`
4. Add custom hooks in `/src/hooks` if needed
5. Add unit tests for all components and hooks

### Adding a Protected Route
1. Create a new page in `/src/pages`
2. Set `requireAuth = true` as a static property on the page component
3. Auth guard will automatically protect the route

### Data Fetching Pattern
1. Create a custom hook that uses `useFetch`
2. Pass the API endpoint and cache key to `useFetch`
3. Use the hook in your component to access data and loading states

### Testing Components
1. Use the `AppWrapper` from `test.utils.tsx` to wrap components with necessary providers
2. Use MSW to mock API responses with `mswMock()`
3. Follow the Arrange-Act-Assert pattern in test cases