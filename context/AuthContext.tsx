// context/AuthContext.tsx
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AuthenticationService,
  Body_login,
  OpenAPI,
  User,
  UserCreate,
  UsersService,
} from '../api'; // 1. Import OpenAPI

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: Body_login) => Promise<void>;
  register: (data: UserCreate) => Promise<void>;
  logout: () => void;
  updateUser: (newUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Configure the API Base URL ---
// It's good practice to set the base URL for your API client from your environment variables.
OpenAPI.BASE = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.105:8000';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a token on app startup
    const loadUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          // 2. Configure the API client with the token for this session
          OpenAPI.TOKEN = token;
          const currentUser = await UsersService.getUser();
          setUser(currentUser);
        }
      } catch (e) {
        console.log('Failed to load user.', e);
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
      console.log('Failed to process login.', e);
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
      console.log('Failed to register.', e);
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

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, register, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @hook useAuth
 *
 * This hook provides access to the global authentication context. It is the
 * single source of truth for the user's authentication status and session data.
 *
 * It should be used for:
 * - Checking if a user is currently logged in.
 * - Accessing basic user data for display in components like headers.
 * - Calling the `login` and `logout` functions to manage the session.
 *
 * This hook does not handle fetching or refetching detailed profile data;
 * for that, use the `useUser` hook on data-focused screens.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
