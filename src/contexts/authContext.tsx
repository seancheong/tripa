import { createAuthClient } from 'better-auth/react';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

const authClient = createAuthClient();

type AuthContextType = {
  loading: boolean;
  githubSignIn: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  loading: false,
  githubSignIn: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const githubSignIn = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
        errorCallbackURL: '/error',
      });
    } catch (err) {
      console.error('Github login failed', err);
      throw err;
    }
  };

  return (
    <AuthContext value={{ loading, githubSignIn }}>{children}</AuthContext>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
