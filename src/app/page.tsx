import GithubSignInButton from '@/components/GithubSignInButton';
import { auth } from '@/utils/auth';
import { ArrowRightIcon } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="hero bg-base-200 container mx-auto mt-4">
      <div className="hero-content min-h-96 text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Tripa</h1>
          <p className="py-6">
            Keep track of your travels and adventures with Tripa. Add locations,
            photos and notes to create a personalized travel journal.
          </p>
          {session ? (
            <Link href="/dashboard" className="btn btn-accent">
              Go to Dashboard <ArrowRightIcon size={16} />
            </Link>
          ) : (
            <GithubSignInButton />
          )}
        </div>
      </div>
    </div>
  );
}
