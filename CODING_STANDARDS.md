# Coding Standards

This document outlines the coding standards for Hey Margot UI project, ensuring uniformity across components and hooks while adhering to SOLID principles.

## General Principles

1. **Separation of Concerns**:

   - Components should only contain UI logic
   - Business logic should be contained in hooks
   - Data fetching logic should be abstracted away from UI components

2. **SOLID Principles**:

   - **Single Responsibility**: Each component or hook should have one job
     - _Example_: Separate `PostsList` for displaying posts, `PostEditor` for editing posts, and `PostFilters` for filtering posts, rather than one monolithic `PostsManager` component
     - _Example_: Create a specific `usePostStats` hook for post analytics rather than adding statistics functionality to `usePosts`
   - **Open/Closed**: Code should be open for extension but closed for modification
     - _Example_: Create a `Button` component with a `variant` prop that accepts 'primary', 'secondary', or 'danger', allowing new styling without modifying the component
     - _Example_: A `FormField` component that accepts custom validation rules rather than hardcoding them
   - **Liskov Substitution**: Subtypes should be substitutable for their base types
     - _Example_: Any authentication provider (`GithubAuthProvider`, `GoogleAuthProvider`) can be used interchangeably where `AuthProvider` is expected
     - _Example_: `AdminDashboard` and `UserDashboard` both implement a common `Dashboard` interface so either can be rendered by a `DashboardContainer`
   - **Interface Segregation**: Prefer smaller, specific interfaces over large, general ones
     - _Example_: Split `UserProps` into more specific `UserProfileProps`, `UserContactProps`, and `UserPreferencesProps` for different components
     - _Example_: Create separate `ReadOnlyPostProps` and `EditablePostProps` interfaces rather than a single `PostProps` with many optional fields
   - **Dependency Inversion**: Depend on abstractions, not concrete implementations
     - _Example_: Components consume the `useUser` hook interface rather than directly calling specific API endpoints
     - _Example_: Use a `ThemeProvider` context to inject theme values rather than importing theme constants directly

3. **Consistent File Structure**:
   - One component/hook per file
   - Export as default
   - Named export for types if needed

## Component Standards

### Component File Structure

```typescript
// Imports (order matters)
// 1. React & Next.js imports
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 2. Third-party libraries (alphabetical)
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

// 3. Project imports (paths ordered by hierarchy)
import { SomeType } from '../../types';
import useSomeHook from '../../hooks/useSomeHook';
import ChildComponent from './components/ChildComponent';

// 4. Styles (if applicable)
import styles from './Component.module.css';

// Interface (named exports)
interface Props {
  propOne: string;
  propTwo?: number;
}

// Component definition (default export)
export default function ComponentName({ propOne, propTwo = 0 }: Props) {
  // State declarations
  const [state, setState] = useState(initialState);

  // Hooks (arranged by importance)
  const { data } = useSomeHook();

  // Event handlers
  const handleClick = () => {
    // Handler implementation
  };

  // Side effects
  useEffect(() => {
    // Effect implementation
  }, [dependencies]);

  // Helper functions
  const formatData = (input) => {
    // Format implementation
  };

  // Early returns if needed
  if (!data) return null;

  // Render
  return (
    <div>
      {/* JSX structure */}
    </div>
  );
}
```

### Component Naming Conventions

1. **File Names**: PascalCase for component files (e.g., `LoginButton.tsx`)
2. **Component Names**: PascalCase, descriptive of functionality (e.g., `LoginButton`)
3. **Directory Structure**:
   - `/components`: Reusable components used across the application
   - `/Features`: Feature-specific components
   - Component directories should contain:
     - Main component file
     - `index.tsx` file for exporting
     - `/components` subdirectory for child components
     - `/__tests__` subdirectory for tests

### Component Best Practices

1. **Props**:

   - Define prop interfaces explicitly
   - Provide default values for optional props
   - Use destructuring for props
   - Keep prop lists small (consider composition for complex components)

2. **Component Composition**:

   - Break large components into smaller, focused ones
   - Use composition over inheritance
   - Child components specific to a parent should be in a `/components` subdirectory

3. **State Management**:

   - Keep component state minimal
   - Prefer hooks for complex state management
   - Use context for application-wide state

4. **UI Logic Only**:

   - Components should only handle presentation and UI interaction
   - Extract data fetching, transformation, and business logic to hooks
   - Components should receive data and callbacks via props

5. **Error and Loading States**:

   - Handle loading, error, and empty states within the component
   - Provide user feedback for asynchronous operations

6. **Material UI Usage**:

   - Prefer MUI components over custom HTML when possible
   - Follow MUI patterns for styling
   - Use MUI theme for consistent styling

7. **Accessibility**:
   - Use semantic HTML elements
   - Include ARIA attributes when needed
   - Ensure keyboard navigation works

## Hook Standards

### Hook File Structure

```typescript
// Imports (order matters)
// 1. React & Next.js imports
import { useState, useEffect } from 'react';

// 2. Third-party libraries (alphabetical)
import { useQuery } from 'react-query';

// 3. Project imports (paths ordered by hierarchy)
import { SomeType } from '../../types';
import apiClient from '../../services/apiClient';

// Interface definitions
interface Props {
  param1: string;
  param2?: number;
}

interface ReturnType {
  data: SomeType[];
  isLoading: boolean;
  error: Error | null;
}

// Hook definition (default export)
export default function useSomeFeature({ param1, param2 = 0 }: Props): ReturnType {
  // State declarations
  const [state, setState] = useState(initialState);

  // API calls or other logic
  const fetchData = async () => {
    // Implementation
  };

  // Side effects
  useEffect(() => {
    // Effect implementation
  }, [dependencies]);

  // Helper functions
  const processData = input => {
    // Process implementation
  };

  // Return hook data/functions
  return {
    data,
    isLoading,
    error,
  };
}
```

### Hook Naming Conventions

1. **File Names**: camelCase, prefixed with "use" (e.g., `usePosts.ts`)
2. **Hook Names**: camelCase, prefixed with "use" (e.g., `usePosts`)
3. **Directory Structure**:
   - `/hooks`: Application-wide hooks
   - `/features/[FeatureName]/hooks`: Feature-specific hooks
   - Hook directories should contain:
     - Hook files
     - `/__tests__` subdirectory for tests

### Hook Best Practices

1. **Single Responsibility**:

   - Each hook should have a clear, focused purpose
   - Composition over complexity (create smaller hooks that can be composed)

2. **Business Logic**:

   - Hooks should encapsulate business logic and data operations
   - Perform data transformation, validation, and processing in hooks

3. **Data Fetching**:

   - Use React Query or similar libraries for data fetching and caching
   - Abstract API calls and error handling
   - Prefer to use the abstracted hooks like `useFetch`, `usePost`, `usePut`, and `useDelete`

4. **Return Values**:

   - Return values should be consistent (object with named properties)
   - Include loading and error states in returned object
   - Document the return type explicitly

5. **Error Handling**:

   - Handle and transform errors appropriately
   - Provide meaningful error messages
   - Return error state for consumers to handle

6. **Dependencies**:

   - Minimize external dependencies
   - Ensure proper dependency arrays in useEffect calls
   - Consider memoization for expensive calculations

7. **Reusability**:
   - Design hooks to be reusable when appropriate
   - Consider parameterization for flexibility
   - Create specialized hooks that use more generic ones

## Examples

### Component Example

```typescript
// src/Features/UserProfile/components/ProfileCard.tsx
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { User } from '../../../types/user';
import ContactInfo from './ContactInfo';

interface ProfileCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

export default function ProfileCard({ user, onEdit }: ProfileCardProps) {
  const [showContact, setShowContact] = useState(false);

  const handleContactToggle = () => {
    setShowContact(prev => !prev);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(user);
    }
  };

  return (
    <Card>
      <CardContent>
        <Avatar src={user.avatarUrl} alt={user.name} />
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1">{user.bio}</Typography>

        <Button onClick={handleContactToggle}>
          {showContact ? 'Hide Contact' : 'Show Contact'}
        </Button>

        {onEdit && (
          <Button onClick={handleEdit}>Edit Profile</Button>
        )}

        {showContact && <ContactInfo email={user.email} phone={user.phone} />}
      </CardContent>
    </Card>
  );
}
```

### Hook Example

```typescript
// src/hooks/useUserProfile.ts
import { User } from '../types/user';
import useFetch from '../useFetch';

interface UseUserProfileProps {
  userId: string;
}

export default function useUserProfile({ userId }: UseUserProfileProps) {
  return useFetch({
    cacheKey: `user-${userId}`,
    url: `/api/users/${userId}`,
  });
}

// src/hooks/useUpdateUserProfile.ts
import { useMutation, useQueryClient } from 'react-query';
import { User } from '../types/user';

interface UseUpdateUserProfileProps {
  userId: string;
  onSuccess?: () => void;
}

interface UseUpdateUserProfileReturn {
  updateProfile: (updates: Partial<User>) => void;
  isUpdating: boolean;
  error: Error | null;
}

export default function useUpdateUserProfile({
  userId,
  onSuccess,
}: UseUpdateUserProfileProps): UseUpdateUserProfileReturn {
  const queryClient = useQueryClient();

  const updateUserProfile = async (updates: Partial<User>) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update: ${response.statusText}`);
    }

    return response.json();
  };

  const { mutate, isLoading, error } = useMutation(
    (updates: Partial<User>) => updateUserProfile(updates),
    {
      onSuccess: () => {
        // Invalidate the cache for this user to trigger a refetch
        queryClient.invalidateQueries([`user-${userId}`]);

        if (onSuccess) {
          onSuccess();
        }
      },
    }
  );

  return {
    updateProfile: mutate,
    isLoading,
    error: error as Error | null,
  };
}

// Example of using both hooks together in a component:
//
// function UserProfileEditor({ userId }) {
//   const { data: user, isLoading, error } = useUserProfile({ userId });
//   const { updateProfile, isUpdating, error: updateError } = useUpdateUserProfile({
//     userId
//   });
//
//   // Component logic...
// }
```

## Specific Project Patterns

1. **Page Pattern**:

   - Pages should be minimal, focusing on data fetching and passing to Feature components
   - Use getStaticProps/getServerSideProps for initial data loading
   - Feature components should handle layout and rendering

2. **Authentication Pattern**:

   - Use NextAuth.js and the AuthGuard component
   - Set requireAuth property on pages that need authentication
   - Access authentication state via useSession() hook

3. **API Pattern**:

   - Use the project's useFetch hook abstraction which leverages React-Query
   - Create specialized hooks for each API endpoint (like usePosts, useHealth)
   - Create a single hook for each entity (like usePost, useUser) that handles CRUD operations
   - Follow the single responsibility principle for hooks

4. **Layout Pattern**:
   - Use the Layout component for consistent page structure
   - Header, Footer, and main content areas
   - Page-specific layout should be in Feature components
