import GithubSignInButton from '@/components/GithubSignInButton';
import { Button } from '@/components/ui/button';
import { getSession } from '@/utils/auth';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getSession();

  if (session) redirect('/dashboard');

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">
            Welcome to <span className="text-gradient-orange">Tripa</span>
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue your journey
          </p>
        </div>

        <div className="dark:border-border/50 dark:bg-card/80 rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <GithubSignInButton />
        </div>

        <div className="mt-6 text-center">
          <Link href="/" passHref>
            <Button variant="ghost">
              <ArrowLeftIcon /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
