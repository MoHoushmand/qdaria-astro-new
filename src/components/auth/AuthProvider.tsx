import * as React from 'react';

/**
 * User interface
 */
export interface User {
  id: string;
  email: string;
  emailConfirmed: boolean;
}

/**
 * Session interface
 */
export interface Session {
  expiresAt?: number;
}

/**
 * Authentication context interface
 */
export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

/**
 * Authentication context
 */
const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider props
 */
export interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication provider component
 * Manages authentication state and provides auth methods to children
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  /**
   * Check session on mount and periodically
   */
  React.useEffect(() => {
    checkSession();

    // Check session every 5 minutes
    const interval = setInterval(() => {
      checkSession();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Check current session
   */
  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setUser(data.user);
          setSession(data.session);
        } else {
          setUser(null);
          setSession(null);
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login user
   */
  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    setUser(data.user);
    setSession(data.session);
  };

  /**
   * Register new user
   */
  const register = async (email: string, password: string, fullName?: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        confirmPassword: password,
        fullName,
        acceptTerms: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    setUser(data.user);
    setSession(data.session);
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  /**
   * Refresh session
   */
  const refreshSession = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSession(data.session);
      } else {
        // Session refresh failed, logout user
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      setUser(null);
      setSession(null);
    }
  };

  const value: AuthContextValue = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 * @throws Error if used outside AuthProvider
 */
export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
