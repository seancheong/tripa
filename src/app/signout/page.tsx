'use client';

import { useAuth } from '@/contexts/authContext';
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';

export default function SignOut() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader2Icon size={72} className="animate-spin" />
    </div>
  );
}
