'use client';

import { useAuth } from '@/contexts/authContext';
import { GithubIcon, Loader2Icon } from 'lucide-react';

import { Button } from './ui/button';

export default function GithubSignInButton() {
  const { githubSignIn, loading } = useAuth();

  return (
    <Button
      variant="secondary"
      disabled={loading}
      className="w-full"
      onClick={githubSignIn}
    >
      {loading ? <Loader2Icon className="animate-spin" /> : <GithubIcon />}
      Sign In With Github
    </Button>
  );
}
