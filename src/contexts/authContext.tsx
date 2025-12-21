import type { User } from 'better-auth';
import { createAuthClient } from 'better-auth/react';
import { useRouter } from 'next/navigation';
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

const authClient = createAuthClient();

type AuthContextType = {
  loading: boolean;
  user?: User;
  githubSignIn: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  loading: false,
  githubSignIn: async () => {},
  googleSignIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const session = authClient.useSession();

  const githubSignIn = useCallback(async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
        errorCallbackURL: '/error',
      });
    } catch (err) {
      setLoading(false);
      console.error('Github login failed', err);
      throw err;
    }
  }, []);

  const googleSignIn = useCallback(async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
        errorCallbackURL: '/error',
      });
    } catch (err) {
      setLoading(false);
      console.error('Google login failed', err);
      throw err;
    }
  }, []);

  const signOut = useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
      },
    });
  }, [router]);

  return (
    <AuthContext
      value={{
        loading,
        user: session.data?.user,
        githubSignIn,
        googleSignIn,
        signOut,
      }}
    >
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
