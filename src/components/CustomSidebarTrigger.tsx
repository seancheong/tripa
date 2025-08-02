'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { PanelLeftIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';

import { Button } from './ui/button';

export default function CustomSidebarTrigger(
  props: HTMLAttributes<HTMLButtonElement>,
) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      {...props}
      aria-label="Toggle sidebar"
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
    >
      <PanelLeftIcon />
    </Button>
  );
}
