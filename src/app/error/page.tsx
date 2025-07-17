'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.toString() || 'An unknow error occurs';

  return (
    <div className="hero bg-base-200 container mx-auto mt-4">
      <div className="hero-content min-h-96 text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-red-500">Oops!</h1>
          <p className="py-6 text-red-500">{error}</p>

          <Link href="/" passHref>
            <button className="btn btn-accent">
              Home <ArrowLeftIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
