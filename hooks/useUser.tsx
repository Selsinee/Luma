// hooks/useUser.ts
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { User, UsersService } from '../api';

/**
 * @hook useUser
 *
 * This hook is responsible for fetching and managing the detailed profile data
 * for the currently authenticated user. It should be used on screens that
 * display or interact with user-specific information, like the Profile tab.
 *
 * It provides the user data, loading and error states, and a `refetch`
 * function to get the latest data from the server. After a successful
 * refetch, it also updates the global user state in the AuthContext to
 * prevent stale data across the app.
 */
export const useUser = () => {
  const { updateUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await UsersService.getUser();
      setUser(userData);
      updateUser(userData);
    } catch (err) {
      setError('Failed to fetch user data.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { user, isLoading, error, refetch };
};
