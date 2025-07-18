'use client';

import { useAuth } from '@/contexts/authContext';
import { useEffect } from 'react';

export default function SignOut() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);

  return (
    <div className="card bg-base-200 container mx-auto mt-4 flex min-h-72 flex-col items-center justify-center">
      <span className="loading loading-spinner loading-xl" />
    </div>
  );
}
