import { getSession } from '@/utils/auth';
import Link from 'next/link';

import GithubSignInButton from './GithubSignInButton';
import ProfileDropDownButton from './ProfileDropDownButton';
import ThemeToggleButton from './ThemeToggleButton';

export default async function NavBar() {
  const session = await getSession();

  return (
    <div className="navbar bg-primary text-primary-content">
      <Link href="/" className="navbar-start text-xl">
        Tripa
      </Link>

      <div className="navbar-end">
        <ThemeToggleButton />
        {session ? (
          <ProfileDropDownButton
            name={session.user.name}
            image={session.user.image}
          />
        ) : (
          <GithubSignInButton />
        )}
      </div>
    </div>
  );
}
