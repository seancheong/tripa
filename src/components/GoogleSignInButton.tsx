'use client';

import { useAuth } from '@/contexts/authContext';
import { ChromeIcon, Loader2Icon } from 'lucide-react';

import { Button } from './ui/button';

export default function GoogleSignInButton() {
  const { googleSignIn, loading } = useAuth();

  return (
    <Button
      variant="secondary"
      disabled={loading}
      className="w-full"
      onClick={googleSignIn}
    >
      {loading ? <Loader2Icon className="animate-spin" /> : <ChromeIcon />}
      Sign In With Google
    </Button>
  );
}
