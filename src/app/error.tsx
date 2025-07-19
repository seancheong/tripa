'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'An unknown error occurred';

  return (
    <div className="hero bg-base-200 container mx-auto mt-4">
      <div className="hero-content min-h-96 text-center">
        <div className="max-w-md">
          <h1 className="text-error text-5xl font-bold">Oops!</h1>
          <p className="text-error py-6">{error}</p>

          <Link href="/" className="btn btn-accent">
            Home <ArrowLeftIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
