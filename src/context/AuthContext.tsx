import React, { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { loadUser, clearError } from '../store/slices/authSlice';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // Load user on app start if token exists
    const token = localStorage.getItem('token');
    if (token && !user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    clearError: handleClearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
