'use client';

import { useAuth } from '@/contexts/authContext';
import { GithubIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';

export default function GithubSignInButton() {
  const { githubSignIn, loading, user } = useAuth();

  return (
    <>
      {!loading && user ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-accent m-1">
            {user.image && (
              <div className="avatar">
                <div className="w-6 rounded-full">
                  <img src={user.image} alt={user.name} />
                </div>
              </div>
            )}
            {user.name}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-300 text-base-content rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <Link href="/signout">
                <LogOutIcon />
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      ) : (
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
      )}
    </>
  );
}
