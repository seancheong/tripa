import type { AppCardProps } from '@/components/AppCard';
import AppCard from '@/components/AppCard';

import LocationDropdownButton from './LocationDropdownButton';

export default function LocationCard(props: Omit<AppCardProps, 'action'>) {
  return (
    <AppCard
      {...props}
      action={<LocationDropdownButton href={props.href} title={props.title} />}
    />
  );
}
