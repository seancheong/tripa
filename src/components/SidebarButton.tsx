import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes, ReactNode } from 'react';

import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

interface SidebarButtonProps extends HTMLAttributes<HTMLLIElement> {
  label: string;
  icon: ReactNode;
  href: string;
}

export default function SidebarButton({
  label,
  icon,
  href,
  ...props
}: SidebarButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuItem {...props}>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={label}
        asChild
        className="text-muted-foreground"
      >
        <Link aria-label={label} href={href}>
          {icon}
          <span className={isActive ? 'text-foreground' : ''}>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
