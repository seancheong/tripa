import { User } from 'better-auth';
import { createAuthClient } from 'better-auth/react';
import { redirect } from 'next/navigation';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

const authClient = createAuthClient();

type AuthContextType = {
  loading: boolean;
  user?: User;
  githubSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  loading: false,
  githubSignIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const session = authClient.useSession();

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

  const signOut = async () => {
    await authClient.signOut();
    redirect('/');
  };

  return (
    <AuthContext
      value={{
        loading,
        user: session.data?.user,
        githubSignIn,
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
