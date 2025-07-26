import Link, { type LinkProps } from 'next/link';
import type { MouseEventHandler, PropsWithChildren } from 'react';

interface LocationCardProps extends LinkProps {
  title: string;
  description: string | null;
  isHighlighted?: boolean;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
}

export default function LocationCard({
  children,
  title,
  description,
  isHighlighted,
  ...props
}: PropsWithChildren<LocationCardProps>) {
  return (
    <Link
      className={`card card-compact bg-base-300 mb-2 h-28 w-72 shrink-0 border-2 hover:cursor-pointer ${isHighlighted ? 'border-accent' : 'border-transparent'}`}
      {...props}
    >
      <div className="card-body">
        {children}
        <h3 className="text-xl">{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </Link>
  );
}
