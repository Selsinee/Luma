// context/AuthContext.tsx
import errorGenerator from '@/utils/errorGenerator';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  AuthenticationService,
  Body_login,
  OpenAPI,
  User,
  UserCreate,
  UsersService,
} from '../api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: Body_login) => Promise<void>;
  register: (data: UserCreate) => Promise<void>;
  logout: () => void;
  refetchUser: () => Promise<void>;
  updateUser: (newUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

OpenAPI.BASE = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.105:8000';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Create a reusable function to fetch user data
  const fetchUser = async () => {
    try {
      const currentUser = await UsersService.getUser();
      setUser(currentUser);
    } catch (e) {
      console.log('Failed to fetch user.', e);
      // If fetching fails, it likely means the token is invalid, so log out.
      // await logout();
    }
  };

  useEffect(() => {
    console.log('useAuth mount');
    const loadUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          OpenAPI.TOKEN = token;
          await fetchUser();
        }
      } catch (e) {
        console.log('Failed to load token.', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (data: Body_login) => {
    try {
      setIsLoading(true);
      const response = await AuthenticationService.login(data);
      await SecureStore.setItemAsync('authToken', response.access_token);
      OpenAPI.TOKEN = response.access_token;
      setUser(response.user);
    } catch (e) {
      console.log('Failed to process login.', errorGenerator(e));
      Alert.alert('Error', `Failed to sign in. ${errorGenerator(e)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: UserCreate) => {
    try {
      setIsLoading(true);
      const response = await AuthenticationService.register(data);
      await SecureStore.setItemAsync('authToken', response.access_token);
      OpenAPI.TOKEN = response.access_token;
      setUser(response.user);
    } catch (e) {
      console.log('Failed to register.', errorGenerator(e));
      Alert.alert('Error', `Failed to create account. ${errorGenerator(e)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      OpenAPI.TOKEN = undefined;
      setUser(null);
    } catch (e) {
      console.log('Failed to logout.', e);
    }
  };

  const refetchUser = async () => {
    try {
      setIsLoading(true);
      await fetchUser();
    } catch (e) {
      console.error('Failed to refetch user.', e);
      Alert.alert('Error', `Failed to refetch user data. ${errorGenerator(e)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        refetchUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
