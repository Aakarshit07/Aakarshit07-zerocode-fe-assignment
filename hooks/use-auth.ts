'use client';

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import type { AuthState } from '@/lib/types';
import { mockLogin, mockRegister, mockVerifyToken } from '@/lib/mock-auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const result = mockVerifyToken(token);
      if (result.success && result.user) {
        setAuthState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        localStorage.removeItem('token');
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await mockLogin(email, password);

      if (result.success && result.user && result.token) {
        localStorage.setItem('token', result.token);
        setAuthState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true,
        });
        return true;
      } else {
        console.log('Login failed:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const result = await mockRegister(email, password, name);

      if (result.success && result.user && result.token) {
        localStorage.setItem('token', result.token);
        setAuthState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true,
        });
        return true;
      } else {
        console.log('Registration failed:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
