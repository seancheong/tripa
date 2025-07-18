'use client';

import { useAuth } from '@/contexts/authContext';
import { GithubIcon } from 'lucide-react';

export default function GithubSignInButton() {
  const { githubSignIn, loading } = useAuth();

  return (
    <button
      disabled={loading}
      className="btn btn-accent"
      onClick={githubSignIn}
    >
      Sign In With Github{' '}
      {loading ? (
        <span className="loading loading-spinner loading-md" />
      ) : (
        <GithubIcon />
      )}
    </button>
  );
}
