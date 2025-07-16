import Link from 'next/link';

import GithubSignInButton from './GithubSignInButton';

export default function NavBar() {
  return (
    <div className="navbar bg-primary text-primary-content">
      <Link href="/" className="navbar-start text-xl">
        Tripa
      </Link>

      <div className="navbar-end">
        <GithubSignInButton />
      </div>
    </div>
  );
}
