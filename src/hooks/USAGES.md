# Hooks Usage Examples

## usePut

The `usePut` hook is designed for handling PUT requests in a consistent way across the application.

### Basic Usage

```tsx
import usePut from '../hooks/usePut';

interface UserData {
  name: string;
  email: string;
}

function UserProfileEditor({ userId }) {
  // Fetch the user data with useFetch (not shown here)

  const { update, isUpdating, error, isSuccess } = usePut<UserData>({
    cacheKey: `updateUser-${userId}`,
    url: `/api/users/${userId}`,
    invalidateQueries: [`user-${userId}`, 'users'], // Queries to invalidate after successful update
  });

  const handleSubmit = formData => {
    update({
      name: formData.name,
      email: formData.email,
    });
  };

  return (
    <div>
      {isUpdating && <div>Updating...</div>}
      {error && <div>Error: {error.message}</div>}
      {isSuccess && <div>Update successful!</div>}

      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.target);
          handleSubmit({
            name: formData.get('name'),
            email: formData.get('email'),
          });
        }}
      >
        {/* Form fields */}
        <button type="submit" disabled={isUpdating}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
```

### Advanced Usage with Promise Chain

```tsx
import usePut from '../hooks/usePut';

function UserProfileEditor({ userId, onSuccessNavigate }) {
  const { updateAsync, isUpdating } = usePut({
    cacheKey: `updateUser-${userId}`,
    url: `/api/users/${userId}`,
  });

  const handleSubmit = async formData => {
    try {
      // Use updateAsync which returns a promise
      const result = await updateAsync({
        name: formData.name,
        email: formData.email,
      });

      // Do something with the result
      console.log('Updated user:', result);

      // Navigate to another page or perform additional actions
      onSuccessNavigate(result.id);
    } catch (error) {
      // Handle error
      console.error('Failed to update user:', error);
    }
  };

  // Rest of component...
}
```

### Integration with Form Libraries

```tsx
import { useForm } from 'react-hook-form';
import usePut from '../hooks/usePut';

function UserProfileForm({ userId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    update,
    isUpdating,
    error,
    isSuccess,
    reset: resetMutation,
  } = usePut({
    cacheKey: `updateUser-${userId}`,
    url: `/api/users/${userId}`,
    onSuccess: () => {
      // Show success message, etc.
    },
  });

  const onSubmit = data => {
    update(data);
  };

  // Reset both form and mutation state
  const handleReset = () => {
    resetMutation();
    // Reset form if needed
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name', { required: true })} />
        {errors.name && <span>Name is required</span>}
      </div>

      <div>
        <label>Email</label>
        <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email && <span>Valid email is required</span>}
      </div>

      <button type="submit" disabled={isUpdating}>
        {isUpdating ? 'Saving...' : 'Save Changes'}
      </button>

      {error && <div className="error">Error: {error.message}</div>}
      {isSuccess && <div className="success">Profile updated successfully!</div>}
    </form>
  );
}
```
