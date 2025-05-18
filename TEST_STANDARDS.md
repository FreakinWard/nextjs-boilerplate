# Test Coding Standards

This document outlines the standards for writing tests in the Hey Margot UI project, ensuring uniformity and maintainability across the codebase.

## General Principles

1. **User-Centric Descriptions**:

   - Component tests: Write test descriptions from the end-user's perspective
   - Hook/utility tests: Write descriptions from the developer's perspective
   - API tests: Focus on expected response behavior

2. **Triple-A Pattern**:

   - Always structure tests with Arrange, Act, Assert sections
   - Use comment markers to separate sections (// arrange, // act, // assert)
   - Keep sections distinct and purpose-focused

3. **Simplicity**:

   - Tests should be short, focused, and readable
   - One behavior per test
   - Clear, specific assertions

4. **Reusable Helpers**:
   - Extract common test setup into helper functions
   - Use consistent naming patterns for helpers (`renderComponent`, `mockService`, etc.)

## Test Structure

### Test File Organization

```typescript
// Import test utilities first
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

// Import mocks
import * as serviceMock from '../mocks';

// Import component/function under test last
import { ComponentUnderTest } from '../Component';

describe('ComponentName', () => {
  // Helper functions first
  const renderComponent = () => {
    // arrange
    // act
    render(<ComponentUnderTest />);
    // assert (if applicable)
  };

  // Mock setup functions
  const mockDependency = () => {
    // Setup mock
    return { mockInstance };
  };

  // Tests grouped by behavior
  it('should render component', () => {
    // arrange
    // act
    renderComponent();
    // assert
    expect(...).toBeInTheDocument();
  });
});
```

## Naming Conventions

### Test Blocks and Function Names

1. **Describe Blocks**: Name after the component/function under test:

   ```typescript
   describe('Header', () => {});
   ```

2. **Test Cases**: Start with "should" and describe expected behavior from user's perspective:
   ```typescript
   it('should display user name when logged in', () => {});
   it('should show login button when user is not authenticated', () => {});
   ```
3. **Helper Functions**: Use names that clearly describe their purpose:
   ```typescript
   const renderComponent = () => {};
   const mockUserSession = authState => {};
   const clickButton = async label => {};
   ```

## Component Test Standards

1. **Focus on User Behavior**:

   ```typescript
   // Good
   it('should show login form when sign in button is clicked', async () => {});

   // Avoid
   it('toggles loginFormVisible state when button clicked', async () => {});
   ```

2. **Test Component Interactions**:

   ```typescript
   it('should call signIn when login button is clicked', async () => {
     // arrange
     const { signInMock } = mockAuth();

     // act
     renderComponent();
     await clickButton('Sign In');

     // assert
     expect(signInMock).toHaveBeenCalled();
   });
   ```

3. **Extract Repetitive User Interactions**:
   ```typescript
   const clickMenuItem = async label => {
     const user = userEvent.setup();
     const menuItem = screen.getByRole('menuitem', { name: label });
     await user.click(menuItem);
   };
   ```

## Hook Test Standards

1. **Focus on API and Return Values**:

   ```typescript
   it('should return posts data when fetch is successful', async () => {
     // arrange
     // act
     const { result } = renderHook(() => usePosts(), { wrapper });

     // assert
     await waitFor(() => {
       expect(result.current.data).toEqual(expectedPosts);
     });
   });
   ```

2. **Test Error States and Loading States**:

   ```typescript
   it('should set isLoading to true during fetch', () => {
     // arrange
     // act
     const { result } = renderHook(() => usePosts(), { wrapper });

     // assert
     expect(result.current.isLoading).toBe(true);
   });
   ```

## API Route Test Standards

1. **Focus on Request/Response Behavior**:

   ```typescript
   it('should return status 200 with expected data structure', async () => {
     // arrange
     const handler = apiRoute;

     // act & assert (combined for API tests)
     await testApiHandler({
       handler,
       test: async ({ fetch }) => {
         const res = await fetch({ method: 'GET' });
         const result = await res.json();

         expect(res.status).toBe(200);
         expect(result).toHaveProperty('data');
       },
     });
   });
   ```

## Test Data

1. **Use Descriptive Test Data**:

   ```typescript
   // Good
   const mockUser = {
     name: 'Test User',
     email: 'test@example.com',
   };

   // Avoid
   const mockUser = {
     name: 'asdf',
     email: 'qwer',
   };
   ```

2. **Reuse Seed Data When Appropriate**:

   ```typescript
   import seedPosts from '../../core/msw/seed/seedPosts';

   it('should display all posts', async () => {
     // arrange & act
     renderComponent();

     // assert
     seedPosts.data.forEach(post => {
       expect(screen.getByText(post.title)).toBeInTheDocument();
     });
   });
   ```

## Mock Usage

1. **Use MSW for API Mocking**:

   ```typescript
   mswMock(); // Setup MSW before tests
   ```

2. **Use Explicit Mock Returns**:

   ```typescript
   jest.spyOn(nextAuth, 'useSession').mockReturnValue({
     status: 'authenticated',
     data: { user: mockUser },
   });
   ```

3. **Helper Functions for Complex Mocks**:
   ```typescript
   const mockAuth = (status = 'authenticated') => {
     // Mock setup
     return { mockInstances, mockFunctions };
   };
   ```

## Testing Asynchronous Behavior

1. **Use Async/Await Pattern**:

   ```typescript
   it('should display loading state then loaded data', async () => {
     // arrange
     // act
     renderComponent();

     // assert
     expect(screen.getByText('Loading...')).toBeInTheDocument();
     expect(await screen.findByText('Data Loaded')).toBeInTheDocument();
   });
   ```

2. **Use WaitFor for Changing States**:
   ```typescript
   await waitFor(() => {
     expect(result.current.data).toEqual(expectedData);
   });
   ```

## Examples

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import ProfileCard from '../ProfileCard';

describe('ProfileCard', () => {
  const mockUserData = {
    name: 'Jane Doe',
    bio: 'Software developer',
    email: 'jane@example.com',
  };

  const renderComponent = (props = {}) => {
    // arrange
    const user = userEvent.setup();

    // act
    render(<ProfileCard userData={mockUserData} {...props} />);

    // assert
    return { user };
  };

  it('should display user name and bio', () => {
    // arrange
    // act
    renderComponent();

    // assert
    expect(screen.getByText(mockUserData.name)).toBeInTheDocument();
    expect(screen.getByText(mockUserData.bio)).toBeInTheDocument();
  });

  it('should show contact info when "Contact" button is clicked', async () => {
    // arrange
    // act
    const { user } = renderComponent();

    // assert
    expect(screen.queryByText(mockUserData.email)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Contact' }));

    expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
  });
});
```

### Hook Test Example

```typescript
import { renderHook, waitFor } from '@testing-library/react';

import { AppWrapper as wrapper } from '../../core/test.utils';
import useUserProfile from '../useUserProfile';

describe('useUserProfile', () => {
  it('should return user profile data when fetch is successful', async () => {
    // arrange
    const expectedData = { name: 'John Doe', avatar: 'url-to-avatar' };

    // act
    const { result } = renderHook(() => useUserProfile(), { wrapper });

    // assert
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.data).toEqual(expectedData);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
```

### API Test Example

```typescript
import { testApiHandler } from 'next-test-api-route-handler';

import userApi from '../../../pages/api/user';

describe('/api/user', () => {
  it('should return user data when valid ID is provided', async () => {
    // arrange
    const handler = userApi;
    const expectedUser = { id: '123', name: 'Test User' };

    // act & assert
    await testApiHandler({
      handler,
      params: { id: '123' },
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const result = await res.json();

        expect(res.status).toBe(200);
        expect(result).toEqual(expectedUser);
      },
    });
  });
});
```
