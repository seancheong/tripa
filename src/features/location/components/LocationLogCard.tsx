import type { AppCardProps } from '@/components/AppCard';
import AppCard from '@/components/AppCard';

import LocationLogDropdownButton from './LocationLogDropdownButton';

export default function LocationLogCard(
  props: Omit<AppCardProps, 'action'> & { logid: number; locationslug: string },
) {
  return (
    <AppCard
      {...props}
      action={
        <LocationLogDropdownButton
          id={props.logid}
          locationSlug={props.locationslug}
          title={props.title}
          href={props.href}
        />
      }
    />
  );
}
