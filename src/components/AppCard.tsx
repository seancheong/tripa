import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import clsx from 'clsx';
import Link from 'next/link';
import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

export interface AppCardProps extends HTMLAttributes<HTMLDivElement> {
  href: string;
  title: string;
  description: string | null;
  action: ReactNode;
  isHighlighted?: boolean;
}

export default function AppCard({
  children,
  href,
  title,
  description,
  action,
  isHighlighted,
  ...props
}: PropsWithChildren<AppCardProps>) {
  return (
    <Card
      {...props}
      className={clsx(
        'group hover:border-primary justify-between overflow-hidden transition-all duration-300 hover:scale-[1.02]',
        isHighlighted && 'border-primary scale-[1.02]',
      )}
    >
      <CardHeader>
        <CardTitle
          className={clsx(
            'group-hover:text-primary transition-colors duration-200',
            isHighlighted && 'text-primary',
          )}
        >
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>{action}</CardAction>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter>
        <Link href={href} className="w-full" passHref>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
