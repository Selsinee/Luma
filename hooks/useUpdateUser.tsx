// hooks/useUpdateUser.ts
import { UserProfileUpdate, UserSettingsUpdate, UsersService } from '@/api';
import { useAuth } from '@/context/AuthContext';
import errorGenerator from '@/utils/errorGenerator';
import { useState } from 'react';
import { Alert } from 'react-native';

/**
 * @hook useUpdateUser
 *
 * This hook provides functions to update the authenticated user's profile data
 * or settings. It manages the loading and error state for the update operations.
 * After a successful update, it calls `refetchUser` from the AuthContext
 * to ensure the global user state is up-to-date.
 */
export const useUpdateUser = () => {
  const { refetchUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserProfile = async (
    profileData: UserProfileUpdate,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await UsersService.updateUser(profileData);
      await refetchUser();
      return true;
    } catch (e) {
      const errorMessage = errorGenerator(e) || 'Failed to update profile.';
      setError(errorMessage);
      Alert.alert('Update Failed', errorMessage);
      console.log(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserSettings = async (
    settingsData: UserSettingsUpdate,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(settingsData);
      await UsersService.updateSettings(settingsData);
      await refetchUser();
      return true;
    } catch (e) {
      const errorMessage = errorGenerator(e) || 'Failed to update settings.';
      setError(errorMessage);
      Alert.alert('Update Failed', errorMessage);
      console.log(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUserProfile,
    updateUserSettings,
    isLoading,
    error,
  };
};
