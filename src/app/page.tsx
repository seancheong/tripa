import GithubSignInButton from '@/components/GithubSignInButton';

export default function HomePage() {
  return (
    <div className="hero bg-base-200 container mx-auto mt-4">
      <div className="hero-content min-h-96 text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Tripa</h1>
          <p className="py-6">
            Keep track of your travels and aventures with Tripa. Add locations,
            photos and notes to create a personalized travel journal.
          </p>
          <GithubSignInButton />
        </div>
      </div>
    </div>
  );
}
