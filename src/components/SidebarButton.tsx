import Link from 'next/link';
import { HTMLAttributes, ReactNode } from 'react';

interface SidebarButtonProps extends HTMLAttributes<HTMLDivElement> {
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
  ...props
}: SidebarButtonProps) {
  return (
    <div
      {...props}
      className={`${showLabel ? '' : 'tooltip'} tooltip-right`}
      data-tip={showLabel ? undefined : label}
    >
      <Link
        aria-label={label}
        href={href}
        className={`btn w-full ${showLabel ? 'justify-start' : 'justify-center'}`}
      >
        {icon}
        {showLabel && label}
      </Link>
    </div>
  );
}
