import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';

interface ProfileDropDownButtonProps {
  name: string;
  image?: string | null;
}

export default function ProfileDropDownButton({
  name,
  image,
}: ProfileDropDownButtonProps) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-accent m-1">
        {image && (
          <div className="avatar">
            <div className="w-6 rounded-full">
              <img src={image} alt={name} />
            </div>
          </div>
        )}
        {name}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-300 text-base-content rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <Link href="/signout">
            <LogOutIcon size={16} />
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
}
