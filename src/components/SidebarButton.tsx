import Link from 'next/link';
import { ReactNode } from 'react';

interface SidebarButtonProps {
  showLabel: boolean;
  label: string;
  icon: ReactNode;
  href: string;
}

export default function SidebarButton({
  showLabel,
  label,
  icon,
  href,
}: SidebarButtonProps) {
  return (
    <div
      className={`${showLabel ? '' : 'tooltip'} tooltip-right`}
      data-tip={showLabel ? undefined : label}
    >
      <Link
        aria-label={label}
        href={href}
        className={`btn ${showLabel ? 'justify-start' : 'justify-center'}`}
      >
        {icon}
        {showLabel && label}
      </Link>
    </div>
  );
}
