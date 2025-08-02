import type { AppCardProps } from '@/components/AppCard';
import AppCard from '@/components/AppCard';

import LocationDropdownButton from './LocationDropdownButton';

export default function LocationCard(
  props: Omit<AppCardProps, 'action'> & { locationid: number },
) {
  return (
    <AppCard
      {...props}
      action={
        <LocationDropdownButton
          id={props.locationid}
          href={props.href}
          title={props.title}
        />
      }
    />
  );
}
